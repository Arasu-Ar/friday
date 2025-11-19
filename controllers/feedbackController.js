const { default: mongoose } = require('mongoose');
const Feedback = require('../models/feedback');
exports.createFeedback = async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.status(201).json(feedback);
};
exports.getAllfeedbacks = async (req, res) => {
  try{
    const feedbacks = await Feedback.find().sort({createdAt:-1});
    res.status(200).json(feedbacks);
  }
  catch(error){
    console.error(" Error Fetching Feedback",error);
    res.status(500).json({message: "failed to fetch feedback"});
  }
}
exports.getApprovedFeedback = async (req, res) => {
  try {
     const feedbacks = await Feedback.find({ approved: true });
     res.status(200).json(feedbacks);
  } catch (error) {
     console.error(" Error Fetching approved Feedback",error);
     res.status(500).json({message: "failed to fetch approved feedback"});
  }
};
exports.removeFeedback = async (req, res) =>{
  try{
       const id = req.params.id;

       if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("Feedback Id is not valid:");
        return res.status(400).json({message:"invalid Id Format"});
       }

       const feedback = await Feedback.findByIdAndDelete(id);
       
       if(!feedback){
        console.log("feedback Not Found with id",id);
        return res.status(404).json({message:"FeedBack not Found"});
       }
       
       console.log("Feedback Deleted Successfully!");
       res.status(200).json({
        message : "Feedback Deleted Sucessfully",
        DeleteFeedback: feedback
       });
       
  }catch(error){
       console.error("Error in FeedbackRemove:",error);
       res.status.json({
        message:"Sever Error during feedbackRemoval",
        error:error.message
      });
  }
  
}

exports.updateFeedbackApprovalStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { approved } = req.body; 

        // 1. Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid feedback ID format." });
        }

        // 2. Validate 'approved' field
        if (typeof approved !== 'boolean') {
            return res.status(400).json({ message: "Approved status must be a boolean (true/false)." });
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { approved: approved },
            { new: true, runValidators: true }
        );

        if (!updatedFeedback) {
            console.log("Feedback not found with ID:", id);
            return res.status(404).json({ message: "Feedback not found." });
        }

        console.log(`Feedback ID ${id} approval status updated to: ${approved}`);
        res.status(200).json({
            message: "Feedback approval status updated successfully.",
            feedback: updatedFeedback
        });

    } catch (error) {
        console.error("Error updating feedback approval status:", error);
        res.status(500).json({
            message: "Server error updating feedback status.",
            error: error.message
        });
    }
};