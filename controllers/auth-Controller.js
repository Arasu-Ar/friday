const e = require('cors');
const JWT = require('jsonwebtoken');
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Fetch credentials from environment variables
        const adminUsername = process.env.USER_NAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Always check for both username and password in the request body
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required."
            });
        }

        // Validate credentials against environment variables
        if (username === adminUsername && password === adminPassword) {
            const accessToken = JWT.sign(
                { userId: username },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '120m' } // Token expires in 120 minutes
            );

            res.status(200).json({
                success: true,
                message: "Login successful.",
                expiry: Date.now() + 120 * 60 * 1000, // Token expiry time in milliseconds
                accessToken
            });
        } else {
            // Send a generic error for security (don't specify if username or password was wrong)
            res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "An internal server error occurred. Please try again."
        });
    }
};