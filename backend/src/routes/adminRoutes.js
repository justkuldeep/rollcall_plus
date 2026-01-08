const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/rbacMiddleware');

// All routes here require Admin role
router.use(verifyToken, authorizeRole(['Admin', 'admin']));

router.post('/users', adminController.createUser);
router.get('/users', adminController.listUsers);
router.put('/users/:uid/deactivate', adminController.deactivateUser);
router.post('/users/bulk-import', adminController.bulkImport);

module.exports = router;
