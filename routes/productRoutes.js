const express = require('express');
const { createProduct, getProducts, getProductsByCategory, removeProduct } = require('../controllers/productsController');
const imageUploadMiddleware = require('../middleware/imageUpload-middleware');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();



router.post('/',authMiddleware,imageUploadMiddleware.single('imageFile'),createProduct);
router.get('/get',getProducts);
router.get('/category/:id',getProductsByCategory);
router.delete('/:id',removeProduct);




module.exports = router;