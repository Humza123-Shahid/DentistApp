const express = require('express')
const router = express.Router()
const Appointment = require('../models/Appointment')

router.get('/fetchallappointments', async (req, res) => {
    
    // const appointments=await Appointment.find({});
    // res.json(appointments);
let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const appointments = await Appointment.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Appointment.countDocuments(filter);

  res.json({ data: appointments, total });
})
router.get('/fetchmanyappointments', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const appointments = await Appointment.find({
        _id: { $in: ids }
      });

      return res.json(appointments);
    }

    // fallback → normal getList
    const appointments = await Appointment.find();
    res.json(appointments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsingleappointment/:id", async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  res.json(appointment);
 
});
router.post('/addappointment',async (req,res)=>{
    try {
        
        let success = false;
        const {patient,dentist,appointmentDate,appointmentTime,durationMinutes,treatmentType,status}=req.body;
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        // return res.status(400).json({ success,errors: errors.array() });
        // }
        const appointment=new Appointment({
            patient,dentist,appointmentDate,appointmentTime,durationMinutes,treatmentType,status
        })
        const savedAppointment=await appointment.save();
        res.json(savedAppointment);
        // success=true;
        // res.json({success,data:savedAppointment})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Appointment using :PUT "/api/appointments/updateappointments".Login required
router.put('/updateappointment/:id',async (req,res)=>{
    const {patient,dentist,appointmentDate,appointmentTime,durationMinutes,treatmentType,status}=req.body;
    const newAppointment={};
    if(patient){newAppointment.patient=patient};
    if(dentist){newAppointment.dentist=dentist};
    if(appointmentDate){newAppointment.appointmentDate=appointmentDate};
    if(appointmentTime){newAppointment.appointmentTime=appointmentTime};
    if(durationMinutes){newAppointment.durationMinutes=durationMinutes};
    if(treatmentType){newAppointment.treatmentType=treatmentType};
    if(status){newAppointment.status=status};

    let appointment=await Appointment.findById(req.params.id);
    if(!appointment){return res.status(404).send("Not Found")}


    appointment =await Appointment.findByIdAndUpdate(req.params.id,{$set:newAppointment},{new:true})
    res.json({success: true, data:appointment});
})
// ROUTE 4: Delete an existing Appointment using :DELETE "/api/appointments/deleteappointments".Login required
router.delete('/deleteappointment',async (req,res)=>{

    try {
        const { ids } = req.body; // array of ids
    
        if (!ids || !ids.length) {
          return res.status(400).json({ message: "No IDs provided" });
        }
    
        await Appointment.deleteMany({
          _id: { $in: ids },
        });
    
        res.json({ data: ids }); // IMPORTANT for react-admin
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
module.exports=router

