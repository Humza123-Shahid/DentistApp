const mongoose = require('mongoose');

// Define the Schema
const PatientHistorySchema = new mongoose.Schema({

  patient: {    
    type: mongoose.Schema.Types.ObjectId, ref: 'Patient'          
  },
  
  chronicConditions:{ //heart issues
    type:String
  },
  cavaties:{ 
    type:String
  },
  crowns:{ 
    type:String
  },
  fillings:{ 
    type:String
  },
  xrayFilePath: 
  { 
    type: String
  },
  intraoralscanFilePath: //3d representations of teeths and gums //also 3d scans third erm
    { 
    type: String
  } 
  // Number
//   price: {               
//     type: Number,
//     required: true,
//     default: 0
//   },
//   // Date
//   expiryDate: {          
//     type: Date,
//     default: Date.now // Uses current date if not provided
//   },
//   // Enumerated Text
//   category: {            
//     type: String,
//     enum: ['Electronics', 'Clothing', 'Food']
//   }
}, 
// Options: Automatically manage createdAt and updatedAt
{ timestamps: true } 
);

module.exports = mongoose.model('PatientHistory', PatientHistorySchema);