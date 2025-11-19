const { default: mongoose } = require('mongoose');
const FQ = require('../models/FQ');
exports.createFQ = async (req, res) => {
  const fq = new FQ(req.body);
  await fq.save();
  res.status(201).json(fq);
};
exports.getAllfQ = async (req, res) => {
  try{
    const fqs = await FQ.find().sort({createdAt:-1});
    res.status(200).json(fqs);
  }
  catch(error){
    console.error(" Error Fetching FQ",error);
    res.status(500).json({message: "failed to fetch FQ"});
  }
}
exports.removeFQ = async (req, res) =>{
  try{
       const id = req.params.id;

       if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("FQ Id is not valid:");
        return res.status(400).json({message:"invalid Id Format"});
       }

       const fq = await FQ.findByIdAndDelete(id);
       
       if(!fq){
        console.log("FQ Not Found with id",id);
        return res.status(404).json({message:"FQ not Found"});
       }
       
       console.log("FQ Deleted Successfully!");
       res.status(200).json({
        message : "FQ Deleted Sucessfully",
        DeleteFeedback: fq
       });
       
  }catch(error){
       console.error("Error in FQRemove:",error);
       res.status.json({
        message:"Sever Error during FQRemoval",
        error:error.message
      });
  }
  
}