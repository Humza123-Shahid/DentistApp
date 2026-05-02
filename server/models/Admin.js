const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({

email:{type:String,required:true,unique:true},
password: String,

}, { timestamps: true });

module.exports=mongoose.model('Admin', AdminSchema);