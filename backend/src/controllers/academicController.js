const { db } = require('../config/firebase');

// Add Subject
exports.addSubject = async (req, res) => {
    try {
        const { code, name, department } = req.body;
        const subjectRef = db.collection('subjects').doc(code);
        await subjectRef.set({ code, name, department });
        res.status(201).json({ message: 'Subject added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create Class / Section
exports.createClass = async (req, res) => {
    try {
        const { classId, className, subjectCode, teacherId, students } = req.body;
        await db.collection('classes').doc(classId).set({
            classId,
            className,
            subjectCode,
            teacherId,
            students: students || [], // Array of UIDs
            updatedAt: new Date().toISOString()
        });
        res.status(201).json({ message: 'Class created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Enroll student in class
exports.enrollStudent = async (req, res) => {
    try {
        const { classId, studentUid } = req.body;
        const classRef = db.collection('classes').doc(classId);
        const classDoc = await classRef.get();

        if (!classDoc.exists) return res.status(404).json({ error: 'Class not found' });

        const students = classDoc.data().students || [];
        if (!students.includes(studentUid)) {
            students.push(studentUid);
            await classRef.update({ students });
        }

        res.status(200).json({ message: 'Student enrolled' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Enter Marks (MST 1, MST 2, etc)
exports.enterMarks = async (req, res) => {
    try {
        const { studentUid, classId, mst1, mst2, totalMarks = 100 } = req.body;
        const marksRef = db.collection('marks').doc(`${classId}_${studentUid}`);

        const marksData = {
            studentUid,
            classId,
            mst1: mst1 || 0,
            mst2: mst2 || 0,
            totalMarks,
            updatedAt: new Date().toISOString()
        };

        await marksRef.set(marksData, { merge: true });
        res.status(200).json({ message: 'Marks updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Marks for a Class
exports.getMarksByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const snapshot = await db.collection('marks').where('classId', '==', classId).get();
        const marks = snapshot.docs.map(doc => doc.data());
        res.status(200).json(marks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const calculateGrade = (marks, total) => {
    const percent = (marks / total) * 100;
    if (percent >= 90) return 'A+';
    if (percent >= 80) return 'A';
    if (percent >= 70) return 'B';
    if (percent >= 60) return 'C';
    if (percent >= 50) return 'D';
    return 'F';
};
