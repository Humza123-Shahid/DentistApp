const express = require('express')
const router = express.Router()
const Appointment = require('../../models/Appointment')
const Patient = require('../../models/Patient');
const Dentist = require('../../models/Dentist');
var fetchuser=require('../../middleware/fetchuser');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomTime() {
  const hours = Math.floor(Math.random() * 9) + 8; // 8 AM - 4 PM
  const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Seed Data ---

const treatmentTypes = ['Checkup', 'Cleaning', 'Root Canal', 'Filling', 'Extraction', 'Whitening'];
const statuses      = ['Scheduled', 'In Progress', 'Completed', 'Cancelled', 'Rescheduled'];
const durations     = [15, 30, 45, 60, 90, 120];

// Replace these with real ObjectIds from your DB, or generate random ones for testing
// const patientIds = (await Patient.find({}, '_id')).map(p => p._id);
// const dentistIds = (await Dentist.find({}, '_id')).map(d => d._id);

// --- Generate & Insert ---
router.post('/addbulkappointment',async (req,res)=>{
  try {
    let success = false;
    const patientIds = await Patient.find().select("_id");
    const dentistIds = await Dentist.find().select("_id");

    if (patientIds.length === 0 || dentistIds.length === 0) {
      console.log("Patients or Dentist not found. Insert them first.");
      return;
    }

    const appointments = [];

    for (let i = 0; i < 1000; i++) {
      appointments.push({
        patient:          randomElement(patientIds),
        dentist:          randomElement(dentistIds),
        appointmentDate:  randomDate(new Date('2024-01-01'), new Date('2025-12-31')),
        appointmentTime:  randomTime(),
        durationMinutes:  randomElement(durations),
        treatmentType:    randomElement(treatmentTypes),
        status:           randomElement(statuses),
      });
    }

    await Appointment.insertMany(appointments);
    console.log('✅ 1000 appointments inserted successfully!');
success=true;
    res.json({success})
  } catch (err) {
    console.error('❌ Error inserting appointments:', err);
  }
})
router.get('/fetchallappointments',fetchuser, async (req, res) => {
    
    // const appointments=await Appointment.find({});
    // res.json(appointments);
let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

//  const sortParam = req.query.sort ? JSON.parse(req.query.sort) : {};
//     const sortField = sortParam.field || 'createdAt';
//     const sortOrder = sortParam.order === 'DESC' ? -1 : 1;
//     const sort = { [sortField]: sortOrder };
  const appointments = await Appointment.find(filter)
  // .sort(sort)
    .skip((page - 1) * perPage)
    .limit(perPage)
    //.lean();

  const total = await Appointment.countDocuments(filter);
//const data = appointments.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
   res.json({ data: appointments, total });
//    const data = appointments.map(item => ({
//   ...item.toObject(), // important if not using .lean()
//   id: item._id
// }));
    //res.json({ data, total });

})
router.get('/fetchmanyappointments',fetchuser, async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const appointments = await Appointment.find({
        _id: { $in: ids }
      })
      //.lean();

       return res.json(appointments);
//        return res.json(
//   appointments.map(item => ({
//     ...item.toObject(),
//     id: item._id
//   }))
// );
      //return res.json(appointments.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
    }

    // fallback → normal getList
    const appointments = await Appointment.find();
    res.json(appointments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsingleappointment/:id",fetchuser, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  //res.json(appointment);
 res.json({
  ...appointment.toObject(),
  id: appointment._id
});
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
router.put('/updateappointment/:id',fetchuser,async (req,res)=>{
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
router.delete('/deleteappointment',fetchuser,async (req,res)=>{

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

