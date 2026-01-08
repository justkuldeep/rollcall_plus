const { db } = require('../config/firebase');
const crypto = require('crypto');

// SECRETS should come from env
const AES_KEY_STRING = process.env.ULTRASONIC_AES_KEY || 'default-secret-key-32-chars-long-!!!';
const AES_IV_STRING = process.env.ULTRASONIC_AES_IV || 'default-iv-16-ch';

// Deriving keys to ensure correct lengths
const AES_KEY = crypto.createHash('sha256').update(AES_KEY_STRING).digest();
const AES_IV = crypto.createHash('md5').update(AES_IV_STRING).digest();

/**
 * Encrypt data for ultrasonic transmission
 */
const encryptPayload = (data) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, AES_IV);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

/**
 * Decrypt data received via ultrasonic
 */
const decryptPayload = (encrypted) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, AES_IV);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
};

// Teacher starts a session
exports.startSession = async (req, res) => {
    try {
        const { classId, durationMinutes = 10 } = req.body;
        const teacherUid = req.user?.uid || 'mock-teacher';

        const sessionId = crypto.randomBytes(8).toString('hex');
        const expiresAt = new Date(Date.now() + durationMinutes * 60000).toISOString();

        const payloadData = {
            sessionId,
            classId,
            timestamp: Date.now()
        };

        const encryptedPayload = encryptPayload(payloadData);

        if (db) {
            await db.collection('attendance_sessions').doc(sessionId).set({
                sessionId,
                classId,
                teacherUid,
                expiresAt,
                createdAt: new Date().toISOString(),
                status: 'active'
            });
        } else {
            console.warn("DB not initialized. Session started in MOCK mode.");
        }

        res.status(201).json({
            sessionId,
            payload: encryptedPayload,
            expiresAt,
            subject: classId, // Include subject for frontend consistency
            sonicCode: sessionId.substring(0, 6).toUpperCase()
        });
    } catch (error) {
        console.error("Start Session Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Student marks attendance
exports.markAttendance = async (req, res) => {
    try {
        const { payload } = req.body;
        const studentUid = req.user?.uid || 'mock-student';

        // 1. Decrypt and verify payload
        let decrypted;
        try {
            decrypted = decryptPayload(payload);
        } catch (e) {
            // Check if it's a raw manual code (for demo purposes)
            if (payload && payload.length === 6) {
                decrypted = { sessionId: 'mock-session', classId: 'Demo', timestamp: Date.now() };
            } else {
                return res.status(400).json({ error: 'Invalid or corrupted signal' });
            }
        }

        const { sessionId, classId, timestamp } = decrypted;

        // 2. Check time window (prevent replay)
        const now = Date.now();
        if (now - timestamp > 30 * 60000) { // Increased for demo
            return res.status(403).json({ error: 'Signal expired' });
        }

        if (db) {
            // 3. Check if session exists and is active
            const sessionDoc = await db.collection('attendance_sessions').doc(sessionId).get();
            if (!sessionDoc.exists && sessionId !== 'mock-session') {
                return res.status(404).json({ error: 'Session not found' });
            }

            // 4. Record attendance
            const recordId = `${sessionId}_${studentUid}`;
            await db.collection('attendance_records').doc(recordId).set({
                recordId,
                sessionId,
                classId,
                studentUid,
                markedAt: new Date().toISOString(),
                verified: true,
                method: 'ultrasonic'
            });
        }

        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Attendance Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// View records (Teacher/Admin)
exports.getAttendanceByClass = async (req, res) => {
    const { classId } = req.params;
    try {
        if (!db) {
            return res.status(200).json([
                { recordId: '1', studentName: 'John Doe', status: 'Present', method: 'Ultrasonic', markedAt: new Date().toISOString() },
                { recordId: '2', studentName: 'Jane Smith', status: 'Absent', method: '-', markedAt: '-' }
            ]);
        }
        const snapshot = await db.collection('attendance_records')
            .where('classId', '==', classId)
            .get();
        const records = snapshot.docs.map(doc => doc.data());
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single session details
exports.getSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!db || sessionId.startsWith('mock-')) {
            return res.status(200).json({
                sessionId,
                subject: 'Mock Session',
                expiresAt: new Date(Date.now() + 15 * 60000).toISOString(),
                status: 'active',
                payload: encryptPayload({ sessionId, classId: 'Mock', timestamp: Date.now() }),
                sonicCode: 'MOCKUP'
            });
        }

        const doc = await db.collection('attendance_sessions').doc(sessionId).get();
        if (!doc.exists) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.status(200).json(doc.data());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get student count for a session
exports.getStats = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!db) {
            return res.status(200).json({ count: Math.floor(Math.random() * 10) });
        }
        const snapshot = await db.collection('attendance_records')
            .where('sessionId', '==', sessionId)
            .get();
        res.status(200).json({ count: snapshot.size });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Stop a session manually
exports.stopSession = async (req, res) => {
    try {
        const teacherUid = req.user?.uid || 'mock-teacher';

        if (db) {
            const snapshot = await db.collection('attendance_sessions')
                .where('teacherUid', '==', teacherUid)
                .where('status', '==', 'active')
                .limit(1)
                .get();

            if (!snapshot.empty) {
                const sessionDoc = snapshot.docs[0];
                await sessionDoc.ref.update({ status: 'closed' });
            }
        }

        res.status(200).json({ message: 'Session stopped' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
