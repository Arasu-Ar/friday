const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true, // Prevents duplicate product titles
        required: true,
        trim: true
    },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Links to the Category model
        required: true
    },
    imageFile: {
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Product', ProductSchema);