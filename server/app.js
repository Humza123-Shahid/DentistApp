const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const db=require('./db')
const app=express()

app.use(bodyParser.json())
app.use(cors())

const port =process.env.port || 5000

app.get('/',(req,res)=>{
    res.send('Hello World from Server')
})

app.use('/api/dentist', require('./routes/dentist'))
app.use('/api/procedure', require('./routes/procedure'))
app.use('/api/pricing', require('./routes/pricing'))
app.use('/api/inventory', require('./routes/inventory'))

app.listen(port,()=>{
    console.log(`Server is Running on : http://localhost:${port}`)
})