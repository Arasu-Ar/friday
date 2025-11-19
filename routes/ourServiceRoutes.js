const express = require('express');
const router = express.Router();
const uploadloadMiddleware = require('../middleware/imageUpload-middleware');
const { createService, getService,removeService } = require('../controllers/oruServiceController');
const authMiddleware = require('../middleware/auth-middleware');




router.post('/',authMiddleware,uploadloadMiddleware.single('image'), createService);
router.get('/', getService);
router.delete('/:id',authMiddleware,removeService);


module.exports = router;