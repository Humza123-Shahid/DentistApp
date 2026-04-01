const mongoose = require('mongoose');

const toothSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  toothNumber: { type: Number, required: true }, // 1-32 (Universal) or 11-48 (ISO)
  procedures: [{
    procedureType: { type: String, enum: ['Filling', 'Crown', 'Root Canal', 'Extraction', 'Implant', 'Veneer', 'Bridge', 'Cleaning'], required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Completed', 'Planned', 'Existing'], default: 'Completed' }
  }]
});


module.exports = mongoose.model('Tooth', toothSchema);