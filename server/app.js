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

app.use('/api/auth',require('./Routes/common/auth'))
app.use('/api/admin', require('./routes/admin/admin'))
app.use('/api/dentist', require('./routes/admin/dentist'))
app.use('/api/procedure', require('./routes/admin/procedure'))
app.use('/api/pricing', require('./routes/admin/pricing'))
app.use('/api/inventory', require('./routes/admin/inventory'))
app.use('/api/expense', require('./routes/admin/expense'))
app.use('/api/patient', require('./routes/admin/patient'))
app.use('/api/patienthistory', require('./routes/admin/patienthistory'))
app.use('/api/appointment', require('./routes/admin/appointment'))
app.use('/api/payment', require('./routes/admin/payment'))
app.use('/api/tooth', require('./routes/admin/tooth'))
app.use('/api/testimonial', require('./routes/admin/testimonial'))
app.use('/api/setting', require('./routes/admin/setting'))
app.use('/api/social', require('./routes/admin/social'))
app.use('/api/dashboard', require('./routes/admin/dashboard'));

app.listen(port,()=>{
    console.log(`Server is Running on : http://localhost:${port}`)
})