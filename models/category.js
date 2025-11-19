const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Prevents duplicate category names
        trim: true
    }
});



CategorySchema.pre('findOneAndDelete', async function (next) {
  const categoryId = this.getQuery()["_id"];
  if (!categoryId) return next();

  const Category = mongoose.model('Category');
  
  // Delete all children recursively
  await Category.deleteMany({ parentId: categoryId });

  next();
});

module.exports = mongoose.model('Category', CategorySchema);