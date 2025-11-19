const Category = require('../models/category');
const Product = require('../models/product');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Category name is required." });
        }
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error.message);
        res.status(500).json({ error: "Something went wrong." });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).json({ error: "Something went wrong." });
    }
};

// delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
     console.log(categoryId);
    // Delete all products under this category
    await Product.deleteMany({ category: categoryId });

    // Delete the category
    await Category.findByIdAndDelete(categoryId);
    console.log(categoryId)

    res.status(200).json({ message: "Category and its products deleted successfully" });
  } catch (err) {
    res.status(500).json({ "console Error": err.message });
  }
};