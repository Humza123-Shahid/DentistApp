const express = require('express')
const router = express.Router()
const Patient = require('../../models/Patient')
var fetchuser=require('../../middleware/fetchuser');
const firstNames = [
  'Ali', 'Sara', 'Ahmed', 'Fatima', 'Omar', 'Ayesha', 'Hassan', 'Zara',
  'James', 'Emily', 'Michael', 'Sophia', 'David', 'Olivia', 'Daniel', 'Emma',
  'Liam', 'Mia', 'Noah', 'Isabella', 'Lucas', 'Amelia', 'Ethan', 'Ava',
  'Muhammad', 'Nadia', 'Tariq', 'Hina', 'Bilal', 'Sana'
];

const lastNames = [
  'Khan', 'Ahmed', 'Ali', 'Sheikh', 'Malik', 'Hussain', 'Iqbal', 'Butt',
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Wilson', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White',
  'Harris', 'Martin', 'Thompson', 'Lee', 'Walker', 'Hall', 'Allen', 'Young'
];

const cities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar',
  'New York', 'London', 'Dubai', 'Toronto', 'Sydney',
  'Berlin', 'Paris', 'Istanbul', 'Cairo', 'Riyadh'
];

const nationalities = [
  'Pakistani', 'American', 'British', 'Canadian', 'Australian',
  'German', 'French', 'Turkish', 'Egyptian', 'Saudi Arabian',
  'Indian', 'Bangladeshi', 'Afghan', 'Iranian', 'Emirati'
];

const genders = ['male', 'female', 'other'];

// --- Helper Functions ---
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomDate = (startYear, endYear) => {
  const start = new Date(`${startYear}-01-01`);
  const end = new Date(`${endYear}-12-31`);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateContact = () => {
  const prefix = getRandom(['03', '92', '+1', '+44', '+971']);
  return `${prefix}${getRandomInt(1000000, 9999999)}`;
};
router.post('/addbulkpatient',async (req,res)=>{
  try {
    let success = false;

    // Optional: clear existing records
    // await Patient.deleteMany({});

    const patients = [];

    for (let i = 0; i < 1000; i++) {
      const firstName = getRandom(firstNames);
      const lastName = getRandom(lastNames);
      const gender = getRandom(genders);
      const dob = getRandomDate(1950, 2005);
      const age = new Date().getFullYear() - dob.getFullYear();
      const city = getRandom(cities);

      patients.push({
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
        address: `${getRandomInt(1, 999)} Street ${getRandomInt(1, 50)}, ${city}`,
        contact: generateContact(),
        dateOfBirth: dob,
        age: age,
        gender: gender,
        nationality: getRandom(nationalities)
      });
    }

    await Patient.insertMany(patients);
    console.log('🎉 1000 patient records inserted successfully!');
success=true;
    res.json({success})
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
});
router.get('/fetchallpatients',fetchuser, async (req, res) => {
    
    // const patients=await Patient.find({});
    // res.json(patients);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const patients = await Patient.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Patient.countDocuments(filter);

  res.json({ data: patients, total });
})
router.get('/fetchmanypatients',fetchuser, async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const patients = await Patient.find({
        _id: { $in: ids }
      });

      return res.json(patients);
    }

    // fallback → normal getList
    const patients = await Patient.find();
    res.json(patients);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsinglepatient/:id",fetchuser, async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.json(patient);
});
router.post('/addpatient',fetchuser, async (req, res) => {

    // const { title,teaser } = req.body;
    // console.log(title,teaser);
    const { name, email, address, contact, dateOfBirth, age, gender, nationality} = req.body;
    const patient = new Patient({ 
       name, email, address, contact, dateOfBirth, age, gender, nationality
     })
    const savedPatient=await patient.save();
    res.json(savedPatient);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatepatient/:id',fetchuser,async (req,res)=>{
    const {name, email, address, contact, dateOfBirth, age, gender, nationality}=req.body;
    const newPatient={};
    if(name){newPatient.name=name};
    if(email){newPatient.email=email};
    if(address){newPatient.address=address};
    if(contact){newPatient.contact=contact};
    if(dateOfBirth){newPatient.dateOfBirth=dateOfBirth};
    if(age){newPatient.age=age};
    if(gender){newPatient.gender=gender};
    if(nationality){newPatient.nationality=nationality};

    
    let patient=await Patient.findById(req.params.id);
    if(!patient){return res.status(404).send("Not Found")}


    patient =await Patient.findByIdAndUpdate(req.params.id,{$set:newPatient},{new:true})
    res.json({success: true, data:patient});
})

// })
router.delete("/deletepatient",fetchuser, async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Patient.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router
