const express = require('express');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();


router.get('/',authMiddleware,(req,res) =>{
    res.json({
      message: `Welcome to admin Page,${req.userInfo.userId}`
    });
  });

module.exports = router;