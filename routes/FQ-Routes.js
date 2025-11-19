const express = require('express');
const router = express.Router();
const uploadloadMiddleware = require('../middleware/imageUpload-middleware');
const { createFQ, getAllfQ , removeFQ } = require('../controllers/FQ-Controller');
const authMiddleware = require('../middleware/auth-middleware');




router.post('/',authMiddleware,uploadloadMiddleware.single('image'), createFQ);
router.get('/', getAllfQ);
router.delete('/:id',authMiddleware,removeFQ);


module.exports = router;