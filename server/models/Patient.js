const mongoose = require('mongoose');

// Define the Schema
const PatientSchema = new mongoose.Schema({

  name: {                
    type: String,
    required: true
  },
  email:{
    type: String,
    unique:true
  },
  address:{
    type: String
  },
  contact:{
    type: String
  },
  dateOfBirth:{
    type: Date
  },
  age:{ 
    type:Number
  },
  gender:{
    type: String, enum: ['male','female','other']
  },
  nationality:{
    type:String
  }
}, 
{ timestamps: true } 
);

module.exports = mongoose.model('Patient', PatientSchema);