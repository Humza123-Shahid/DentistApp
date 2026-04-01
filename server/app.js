const express=require('express')
// const bodyParser=require('body-parser')
const path = require('path');
const cors=require('cors')
const connectToMongo = require('./db');
connectToMongo();
const app=express()


const port =5000


// app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

app.use('/server/patienthistoryuploads', express.static(path.join(__dirname, 'patienthistoryuploads')));

app.use('/api/dentist', require('./routes/dentist'))
app.use('/api/procedure', require('./routes/procedure'))
app.use('/api/pricing', require('./routes/pricing'))
app.use('/api/inventory', require('./routes/inventory'))
app.use('/api/expense', require('./routes/expense'))
app.use('/api/patient', require('./routes/patient'))
app.use('/api/patienthistory', require('./routes/patienthistory'))
app.use('/api/appointment', require('./routes/appointment'))
app.use('/api/payment', require('./routes/payment'))
app.use('/api/tooth', require('./routes/tooth'))

app.listen(port,()=>{
    console.log(`Server is Running on : http://localhost:${port}`)
})