const JWT = require('jsonwebtoken');
// dotenv.config() is not needed here; it should be in your main server.js

const authMiddleware = (req, res, next) => {
    // 1. Correctly access the Authorization header (it's always lowercase)
    const authHeader = req.headers['authorization'];
    
    // 2. Check if the header exists and has the correct "Bearer" format
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    try {
        // 3. Verify the token using the secret key
        const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.userInfo = decodedToken;
        next();
    } catch (error) {
        // 4. Handle specific JWT errors for better responses
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Token has expired.'
            });
        }
        
        return res.status(401).json({
            success: false,
            message: 'Access denied. Invalid token.'
        });
    }
};

module.exports = authMiddleware;