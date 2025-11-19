const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();



router.post('/',authMiddleware,createCategory);
router.get('/',getCategories);
router.delete('/:id',authMiddleware,deleteCategory);




module.exports = router;
