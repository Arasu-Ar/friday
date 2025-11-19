const express = require('express');
const router = express.Router();
const uploadloadMiddleware = require('../middleware/imageUpload-middleware');
const { createWork, getWorks, removeWork } = require('../controllers/workController');
const authMiddleware = require('../middleware/auth-middleware');




router.post('/',authMiddleware,uploadloadMiddleware.single('image'), createWork);
router.get('/', getWorks);
router.delete('/:id',authMiddleware,removeWork);


module.exports = router;
