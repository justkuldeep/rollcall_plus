const express = require('express');
const authRoutes = require('./authRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const adminRoutes = require('./adminRoutes');
const academicRoutes = require('./academicRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/academic', academicRoutes);
router.use('/attendance', attendanceRoutes);

// Placeholder routes
router.get('/status', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

module.exports = router;
