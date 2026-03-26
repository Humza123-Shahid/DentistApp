const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/dentistapp')

mongoose.connection.on('connected',()=>{
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error',(err)=>{
    console.error('Connection Error:',err)
})

module.exports=mongoose