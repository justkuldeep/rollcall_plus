const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academicController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/rbacMiddleware');

router.use(verifyToken);

// Teacher/Admin can add subjects/classes
router.post('/subjects', authorizeRole(['Admin', 'admin', 'Teacher', 'faculty']), academicController.addSubject);
router.post('/classes', authorizeRole(['Admin', 'admin', 'Teacher', 'faculty']), academicController.createClass);
router.post('/enroll', authorizeRole(['Admin', 'admin', 'Teacher', 'faculty']), academicController.enrollStudent);

// Teacher can enter/view marks
router.post('/marks', authorizeRole(['Teacher', 'faculty']), academicController.enterMarks);
router.get('/marks/:classId', authorizeRole(['Teacher', 'faculty']), academicController.getMarksByClass);

module.exports = router;
