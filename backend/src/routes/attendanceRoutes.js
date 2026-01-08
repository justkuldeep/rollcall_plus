const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/rbacMiddleware');

router.use(verifyToken);

// Teacher starts session
router.post('/start-session', authorizeRole(['Teacher', 'faculty']), attendanceController.startSession);

// Student marks attendance
router.post('/mark-present', authorizeRole(['Student', 'student']), attendanceController.markAttendance);

// View records (Teacher/Admin)
router.get('/class/:classId', authorizeRole(['Admin', 'admin', 'Teacher', 'faculty']), attendanceController.getAttendanceByClass);

// Get single session
router.get('/session/:sessionId', authorizeRole(['Teacher', 'faculty', 'Student', 'student']), attendanceController.getSession);

// Get statistics
router.get('/stats/:sessionId', authorizeRole(['Teacher', 'faculty']), attendanceController.getStats);

// Stop session
router.post('/stop', authorizeRole(['Teacher', 'faculty']), attendanceController.stopSession);

module.exports = router;
