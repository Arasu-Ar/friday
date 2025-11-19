const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/auth-middleware');
router.post('/', createAppointment);
router.get('/',authMiddleware, getAppointments);
router.patch('/:id/update',authMiddleware,updateAppointmentStatus);
module.exports = router;