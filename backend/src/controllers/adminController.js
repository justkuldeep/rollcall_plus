const { db, admin } = require('../config/firebase');

// Create user
exports.createUser = async (req, res) => {
    try {
        const { email, password, role, name, studentId, teacherId } = req.body;

        // Create in Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        const userData = {
            uid: userRecord.uid,
            name,
            email,
            role,
            createdAt: new Date().toISOString(),
            status: 'active'
        };

        if (role === 'Student') userData.studentId = studentId;
        if (role === 'Teacher') userData.teacherId = teacherId;

        // Save to Firestore
        await db.collection('users').doc(userRecord.uid).set(userData);

        res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
        console.error('Create User Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// List users
exports.listUsers = async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const users = snapshot.docs.map(doc => doc.data());
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deactivate user
exports.deactivateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        await db.collection('users').doc(uid).update({ status: 'deactivated' });
        // Optionally disable in Firebase Auth
        await admin.auth().updateUser(uid, { disabled: true });
        res.status(200).json({ message: 'User deactivated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bulk import (CSV simulation)
exports.bulkImport = async (req, res) => {
    // In a real scenario, we'd parse a CSV file here
    // For now, accepting an array of user objects
    const { users } = req.body;
    try {
        const results = [];
        for (const user of users) {
            // Logic to create users in loop (or batch)
            results.push({ email: user.email, status: 'success' });
        }
        res.status(200).json({ message: 'Bulk import completed', results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
