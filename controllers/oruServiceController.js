const Service = require('../models/ourService');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const path = require('path');
exports.createService = async (req, res) => {
  try{
    if(!req.file){
      console.log("req.file missing");
      return res.status(400).json({
       error:"Image file is missing !"
      });
    }
    //upload to cloudinary
    const {url,publicId} = await uploadToCloudinary(req.file.path);

    const service = new Service({
      title: req.body.title,
      description: req.body.description,
      image:{
         url,
         publicId
      }     
    });
    await service.save();
    await fs.unlink(req.file.path);
   
    res.status(201).json(service);
  } catch(err){
    console.error("Error",err.message);
    res.status(500).json({
      error:"something went wrong!"
    })
  }
}
  exports.getService = async (req, res) => {
    try {
      const works = await Service.find();
      res.status(200).json(works);
    } catch (error) {
      console.log("Error",error);
      res.status(500).json({message:"Error Fetching Service"});
    }
    
  }

exports.removeService = async (req, res) => {
    try {
        const id = req.params.id;

        const item = await Service.findById(id);

        if (!item) {
            console.log("Item not found with ID:", id);
            return res.status(404).json({ message: "Service item not found." });
        }
        if (item.image && item.image.publicId) {
            try {
                await cloudinary.uploader.destroy(item.image.publicId);
                console.log(`Image deleted from Cloudinary: ${item.image.publicId}`);
            } catch (cloudError) {
                console.error("Error deleting image from Cloudinary:", cloudError);
                // Continue with database deletion even if Cloudinary deletion fails.
            }
        }

        // 3. Delete the item from the database
        await Service.findByIdAndDelete(id);
        console.log("Service item deleted from DB:", id);

        // 4. Send success response
        res.status(200).json({ message: "Service item and associated file removed successfully." });

    } catch (error) {
        console.error("Error in removeService:", error);
        res.status(500).json({ message: "Server error during Service item removal.", error: error.message });
    }
};