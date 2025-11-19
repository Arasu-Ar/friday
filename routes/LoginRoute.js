const express = require('express');
const {loginUser} = require('../controllers/auth-Controller');
const router = express.Router();


router.post('/',loginUser);

module.exports = router;