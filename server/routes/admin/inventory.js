const express = require('express')
const router = express.Router()
var fetchuser=require('../../middleware/fetchuser');
const Inventory = require('../../models/Inventory')

const itemNames = [
  'Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Headphones',
  'Webcam', 'USB Hub', 'Desk Lamp', 'Notebook', 'Pen',
  'Stapler', 'Printer', 'Scanner', 'Cable', 'Chair',
  'Desk', 'Whiteboard', 'Marker', 'Eraser', 'Folder',
];

const descriptions = [
  'High quality product suitable for everyday use.',
  'Durable and reliable, built to last.',
  'Lightweight design with premium finish.',
  'Energy-efficient and eco-friendly.',
  'Best-seller with excellent customer reviews.',
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

// --- Main Seeder ---
router.post('/addbulkinventory',async (req,res)=>{
  try {
    let success = false;
  
  const records = [];

  for (let i = 0; i < 1000; i++) {
    records.push({
      name:        `${getRandom(itemNames)} ${getRandomInt(1, 999)}`,
      quantity:    getRandomInt(1, 500),
      description: getRandom(descriptions),
      costPerUnit: getRandomFloat(1.99, 999.99),
    });
  }

  await Inventory.insertMany(records);
  console.log('✅ 1000 inventory records inserted successfully!');

  success=true;
    res.json({success})
  } catch (err) {
    console.error('❌ Error inserting inventory:', err);
  }
 
})
router.get('/fetchallinventories',fetchuser, async (req, res) => {
    
    // const inventories=await Inventory.find({});
    // res.json(inventories);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const inventories = await Inventory.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Inventory.countDocuments(filter);

  res.json({ data: inventories, total });
})
router.get('/fetchmanyinventories',fetchuser, async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const inventories = await Inventory.find({
        _id: { $in: ids }
      });

      return res.json(inventories);
    }

    // fallback → normal getList
    const inventories = await Inventory.find();
    res.json(inventories);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsingleinventory/:id",fetchuser, async (req, res) => {
  const inventory = await Inventory.findById(req.params.id);
  res.json(inventory);
});
router.post('/addinventory',fetchuser, async (req, res) => {

    // const { title,teaser } = req.body;
    // console.log(title,teaser);
    const { name, quantity, description, costPerUnit } = req.body;
    const inventory = new Inventory({ 
        name, quantity, description, costPerUnit
     })
    const savedInventory=await inventory.save();
    res.json(savedInventory);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateinventory/:id',fetchuser,async (req,res)=>{
    const {name, quantity, description, costPerUnit}=req.body;
    const newInventory={};
    if(name){newInventory.name=name};
    if(quantity){newInventory.quantity=quantity};
    if(description){newInventory.description=description};
    if(costPerUnit){newInventory.costPerUnit=costPerUnit};

    let inventory=await Inventory.findById(req.params.id);
    if(!inventory){return res.status(404).send("Not Found")}


    inventory =await Inventory.findByIdAndUpdate(req.params.id,{$set:newInventory},{new:true})
    res.json({success: true, data:inventory});
})

// })
router.delete("/deleteinventory",fetchuser, async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Inventory.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router
