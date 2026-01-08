const { db } = require('../config/firebase');

/**
 * Middleware to check if the authenticated user has one of the required roles.
 * Must be used after verifyToken middleware.
 * @param {string[]} allowedRoles - Array of roles allowed to access the route.
 */
const authorizeRole = (allowedRoles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: No user context found' });
        }

        try {
            // In MOCK mode, if db is not initialized
            if (!db) {
                console.warn('RBAC: Running in MOCK mode. Allowing access for mock-user-123.');
                if (req.user.uid === 'mock-user-123') {
                    return next();
                }
                return res.status(403).json({ error: 'Forbidden: No database connection' });
            }

            const userDoc = await db.collection('users').doc(req.user.uid).get();

            if (!userDoc.exists) {
                return res.status(404).json({ error: 'User profile not found' });
            }

            const userData = userDoc.data();
            const userRole = userData.role;

            if (allowedRoles.includes(userRole)) {
                req.role = userRole; // Attach role to request for later use
                next();
            } else {
                return res.status(403).json({ error: `Forbidden: Role '${userRole}' does not have access. Required: ${allowedRoles.join(', ')}` });
            }
        } catch (error) {
            console.error('RBAC Error:', error);
            return res.status(500).json({ error: 'Internal Server Error during authorization' });
        }
    };
};

module.exports = authorizeRole;
