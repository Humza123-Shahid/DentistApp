const mongoose = require('mongoose');

// Define the Schema
const PricingSchema = new mongoose.Schema({

  procedure: {    
      type: mongoose.Schema.Types.ObjectId, ref: 'Procedure'          
    },
  fee:{
    type: Number
  },
  effectiveDate:{
    type: Date
  }
},
{ timestamps: true } 
);

module.exports = mongoose.model('Pricing', PricingSchema);