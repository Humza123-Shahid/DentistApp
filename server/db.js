// const mongoose=require('mongoose')
// mongoose.connect('mongodb://localhost:27017/dentistapp')

// mongoose.connection.on('connected',()=>{
//     console.log('Connected to MongoDB')
// })

// mongoose.connection.on('error',(err)=>{
//     console.error('Connection Error:',err)
// })

// module.exports=mongoose
const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/dentistapp"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then((res) => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  })
}

module.exports =connectToMongo;