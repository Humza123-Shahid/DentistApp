const mongoose = require('mongoose');

// Define the Schema
const PaymentSchema = new mongoose.Schema({

  patientId: {                
    type: mongoose.Schema.Types.ObjectId, ref: 'Patient' 
  },
  providerId:{
    type: mongoose.Schema.Types.ObjectId, ref: 'Dentist' 
  },
  appointmentId:{
    type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' 
  },
  paymentDate:{
    type: Date
  },
  paymentMethod:{
    type: String
  },
  paymentType:{                 //Procedure Payment, Deposit, Refund, Prepayment
    type: String
  },
  amount:{
    type: Number
  },
  notes:{
    type: String
  },
},
{ timestamps: true } 
);

module.exports = mongoose.model('Payment', PaymentSchema);