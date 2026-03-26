const mongoose = require('mongoose');

// Define the Schema
const InventorySchema = new mongoose.Schema({

  name: {                
    type: String
  },
  quantity:{
    type: Number
  },
  description:{
    type: String
  },
  costPerUnit:{
    type: Number
  }
},
{ timestamps: true } 
);

module.exports = mongoose.model('Inventory', InventorySchema);