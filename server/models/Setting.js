const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key:      { type: String, required: true}, 
  value:    { type: String, required: true},
  category: { type: String, enum: ['contact', 'timings', 'email'], default: 'contact' },
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);

//contact
//phone_number
//address

//timings
//office_hours
//holiday_schedule

//email
// support_email
//noreply_email