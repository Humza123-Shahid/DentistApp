const mongoose = require('mongoose');
const { Schema } = mongoose;

const SocialSchema = new Schema({
platformName: { type: String },
url: { type: String }
}, { timestamps: true });

module.exports=mongoose.model('Social', SocialSchema);