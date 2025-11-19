const Product = require('../models/product');
const fs = require('fs').promises;
const { uploadToCloudinary } = require('../helpers/cloudinaryHelper');
const cloudinary = require('cloudinary').v2;

// Create a new product (requires a category ID in the request body)
exports.createProduct = async (req, res) => {
    try {
        const { title, description, categoryId } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Image file is missing!" });
        }
        if (!title || !categoryId) {
            return res.status(400).json({ error: "Title and category ID are required." });
        }
   
         const {url,publicId} = await uploadToCloudinary(req.file.path);

        const newProduct = new Product({
            title,
            description,
            category: categoryId, // Assign the category ID
            imageFile: {
                url,
                publicId
            }
        });

        await newProduct.save();
        await fs.unlink(req.file.path);

        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(500).json({ error: "Something went wrong." });
    }
};

// Get all products with their category details
exports.getProducts = async (req, res) => {
    try {
        // The .populate('category') method fetches the full category document
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ message: "Error fetching products." });
    }
};

// Get products by a specific category ID
exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate('category');
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error.message);
        res.status(500).json({ message: "Error fetching products by category." });
    }
};

// ... (Your removeProduct function would remain the same, as it removes by product ID)
exports.removeProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            console.log("Item not found with ID:", id);
            return res.status(404).json({ message: "Product item not found." });
        }
        if (product.imageFile && product.imageFile.publicId) {
            try {
                await cloudinary.uploader.destroy(product.imageFile.publicId);
                console.log(`Image deleted from Cloudinary: ${product.imageFile.publicId}`);
            } catch (cloudError) {
                console.error("Error deleting image from Cloudinary:", cloudError);
                // Continue with database deletion even if Cloudinary deletion fails.
            }
        }

        // 3. Delete the item from the database
        await Product.findByIdAndDelete(id);
        console.log("Product item deleted from DB:", id);

        // 4. Send success response
        res.status(200).json({ message: "Product item and associated file removed successfully." });

    } catch (error) {
        console.error("Error in removeProduct:", error);
        res.status(500).json({ message: "Server error during Product item removal.", error: error.message });
    }
};