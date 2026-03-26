const mongoose = require('mongoose');

// Define the Schema
const ProcedureSchema = new mongoose.Schema({

  name: {                
    type: String
  },
  code:{
    type: String
  },
  description:{
    type: String
  },
  category:{       //Endodontics,Prosthodontics ,Periodontics,Prosthodontics 
    type: String
  },
  durationMinutes:{
    type: Number
  }
},
{ timestamps: true } 
);

module.exports = mongoose.model('Procedure', ProcedureSchema);