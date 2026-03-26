const mongoose = require('mongoose');

// Define the Schema
const AppointmentSchema = new mongoose.Schema({

  patient: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Patient'
  },
  dentist: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Dentist'
  },
  appointmentDate: {
    type: Date
  },
  appointmentTime: {
    type: Date
  },
  durationMinutes: {
    type: Number
  },
  treatmentType: { //Checkup, Cleaning, Root Canal
    type: String
  },
  status:{
    type: String  //Scheduled, In Progress, Completed, Cancelled, Rescheduled
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);