const mongoose = require('mongoose');

// Define the Schema
const DentistSchema = new mongoose.Schema({

  name: {                
    type: String,
    required: true
  },
  salary:{
    type:Number
  },
  contact:{
    type: String
  },
  specialization:{
    type: String
  },
  experienceLevel:{ 
    type:Number
  },
  gender:{
    type: String, enum: ['male','female','other']
  }
}, 
{ timestamps: true } 
);

module.exports = mongoose.model('Dentist', DentistSchema);