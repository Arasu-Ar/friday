const Appointment = require('../models/appointment');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
exports.createAppointment = async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS,
    },
  });
  const rawDate = appointment.date;
  const formattedDate = new Date(rawDate).toLocaleDateString('en-GB');
  const formattime = new Date(rawDate).toLocaleTimeString('en-US');
  await transporter.sendMail({
    from: appointment.email,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Appointment Request',
    html: `<div style="align-items: center; height:"75%"; background-color: azure;" >
            <center> <h1>New Request For Ms yazhu Tech</h1> </center>
            <div style="margin: 20px;">
                <h3>Date:${formattedDate}</h3><h4>Time:${formattime}</h4>
                <h4>Client Name: ${appointment.name}</h4>
                 <h4>Number: ${appointment.phone}</h4>
                 <h4>Location: ${appointment.location}</h4>
                 <h4>Available Time: ${appointment.time}</h4>
                <p>Message:${appointment.message}</p>
            </div>`
  });

  res.status(201).json(appointment);
};
exports.getAppointments = async (req, res) => {
  try {
     const appointments = await Appointment.find();
     res.status(200).json(appointments);
  } catch (error) {
       console.log("Error:",error);
  }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const id = req.params.id; // Appointment ID from URL parameter
        const { status } = req.body; // New status from request body

        // 1. Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid appointment ID format." });
        }

        // 2. Validate 'status' field against enum values
        const validStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed',];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status provided. Must be one of: ${validStatuses.join(', ')}.` });
        }

        // 3. Find and Update the Appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status: status },
            { new: true, runValidators: true } // { new: true } returns updated doc
        );

        if (!updatedAppointment) {
            console.log("Appointment not found with ID:", id);
            return res.status(404).json({ message: "Appointment not found." });
        }

        console.log(`Appointment ID ${id} status updated to: ${status}`);
        res.status(200).json({
            message: "Appointment status updated successfully.",
            appointment: updatedAppointment
        });

    } catch (error) {
        console.error("Error updating appointment status:", error);
        res.status(500).json({
            message: "Server error updating appointment status.",
            error: error.message
        });
    }
};