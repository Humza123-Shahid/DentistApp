const mongoose = require('mongoose');

// Define the Schema
const ExpenseSchema = new mongoose.Schema({

  
  expenseDate:{
    type: Date
  },
  category:{                 //Lab Fees, Supplies, Rent, Utilities
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

module.exports = mongoose.model('Expense', ExpenseSchema);