const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')
const CATEGORIES = ['Lab Fees', 'Supplies', 'Rent', 'Utilities'];

const NOTES_BY_CATEGORY = {
  'Lab Fees':  ['Monthly lab access fee', 'Equipment calibration charge',
                'Lab technician overtime', 'Lab consumables restock',
                'Annual lab certification fee'],
  'Supplies':  ['Office stationery order', 'Printer cartridges',
                'Cleaning supplies', 'Safety equipment', 'First aid kit restock'],
  'Rent':      ['Monthly office rent', 'Warehouse space lease',
                'Parking lot rental', 'Storage unit fee', 'Conference room booking'],
  'Utilities': ['Electricity bill', 'Water bill', 'Internet service',
                'Gas bill', 'Waste disposal fee'],
};

const AMOUNT_RANGE_BY_CATEGORY = {
  'Lab Fees':  { min: 200,  max: 5000  },
  'Supplies':  { min: 10,   max: 500   },
  'Rent':      { min: 1000, max: 15000 },
  'Utilities': { min: 50,   max: 1500  },
};

/** Random integer between min and max (inclusive) */
const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Random date within the past 2 years */
const randDate = () => {
  const now  = Date.now();
  const past = now - 2 * 365 * 24 * 60 * 60 * 1000; // 2 years in ms
  return new Date(past + Math.random() * (now - past));
};

/** Pick a random element from an array */
const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ── Seeder ────────────────────────────────────────────────────────────────────
router.post('/addbulkexpense',async (req,res)=>{
  try {
    let success = false;
  

  const expenses = [];

  for (let i = 0; i < 1000; i++) {
    const category = randItem(CATEGORIES);
    const { min, max } = AMOUNT_RANGE_BY_CATEGORY[category];

    expenses.push({
      expenseDate: randDate(),
      category,
      amount: parseFloat((Math.random() * (max - min) + min).toFixed(2)),
      notes:  randItem(NOTES_BY_CATEGORY[category]),
    });
  }

  await Expense.insertMany(expenses);
  console.log('✅ 1000 expense records inserted successfully');
success=true;
    res.json({success})
  } catch (err) {
    console.error('❌ Error inserting expenses:', err);
  }
 
})
router.get('/fetchallexpenses', async (req, res) => {
    
    // const expenses=await Expense.find({});
    // res.json(expenses);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const expenses = await Expense.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Expense.countDocuments(filter);

  res.json({ data: expenses, total });
})
router.get('/fetchmanyexpenses', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const expenses = await Expense.find({
        _id: { $in: ids }
      });

      return res.json(expenses);
    }

    // fallback → normal getList
    const expenses = await Expense.find();
    res.json(expenses);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsingleexpense/:id", async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  res.json(expense);
});
router.post('/addexpense', async (req, res) => {

    // const { title,teaser } = req.body;
    // console.log(title,teaser);
    const { expenseDate, category, amount, notes } = req.body;
    const expense = new Expense({ 
       expenseDate, category, amount, notes
     })
    const savedExpense=await expense.save();
    res.json(savedExpense);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateexpense/:id',async (req,res)=>{
    const {expenseDate, category, amount, notes}=req.body;
    const newExpense={};
    if(expenseDate){newExpense.expenseDate=expenseDate};
    if(category){newExpense.category=category};
    if(amount){newExpense.amount=amount};
    if(notes){newExpense.notes=notes};

    let expense=await Expense.findById(req.params.id);
    if(!expense){return res.status(404).send("Not Found")}


    expense =await Expense.findByIdAndUpdate(req.params.id,{$set:newExpense},{new:true})
    res.json({success: true, data:expense});
})

// })
router.delete("/deleteexpense", async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Expense.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router
