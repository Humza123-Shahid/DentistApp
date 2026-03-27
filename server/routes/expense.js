const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')

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
