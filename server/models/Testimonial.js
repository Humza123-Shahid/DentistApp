const mongoose = require('mongoose');

// Define the Schema
const TestimonialSchema = new mongoose.Schema({

  patientName: {                
    type: String,
    required: true
  },
  profession:{
    type: String
  },
  comment:{
    type: String
  },
  reviewDate:{
    type: Date
  },
  
}, 
{ timestamps: true } 
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);