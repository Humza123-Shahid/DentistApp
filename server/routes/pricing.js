const express = require('express')
const router = express.Router()
const Pricing = require('../models/Pricing')

router.get('/fetchallpricings', async (req, res) => {
    
    // const pricings=await Pricing.find({});
    // res.json(pricings);
let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const pricings = await Pricing.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Pricing.countDocuments(filter);

  res.json({ data: pricings, total });
})
// router.get('/fetchmanypricings', async (req, res) => {
    
//     try {
//     const { ids } = req.query;

//     // If ids exist → handle getMany
//     if (ids) {
//       const pricings = await Pricing.find({
//         _id: { $in: ids }
//       });

//       return res.json(pricings);
//     }

//     // fallback → normal getList
//     const pricings = await Pricing.find();
//     res.json(pricings);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// })
router.get("/fetchsinglepricing/:id", async (req, res) => {
  const pricing = await Pricing.findById(req.params.id);
  res.json(pricing);
 
});
router.post('/addpricing',[
],async (req,res)=>{
    try {
        
        let success = false;
        const {procedure,fee,effectiveDate}=req.body;
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        // return res.status(400).json({ success,errors: errors.array() });
        // }
        const pricing=new Pricing({
            procedure,fee,effectiveDate
        })
        const savedPricing=await pricing.save();
        res.json(savedPricing);
        // success=true;
        // res.json({success,data:savedPricing})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Pricing using :PUT "/api/pricings/updatepricings".Login required
router.put('/updatepricing/:id',async (req,res)=>{
    const {procedure,fee,effectiveDate}=req.body;
    const newPricing={};
    if(procedure){newPricing.procedure=procedure};
    if(fee){newPricing.fee=fee};
    if(effectiveDate){newPricing.effectiveDate=effectiveDate};
    
    let pricing=await Pricing.findById(req.params.id);
    if(!pricing){return res.status(404).send("Not Found")}


    pricing =await Pricing.findByIdAndUpdate(req.params.id,{$set:newPricing},{new:true})
    res.json({success: true, data:pricing});
})
// ROUTE 4: Delete an existing Pricing using :DELETE "/api/pricings/deletepricings".Login required
router.delete('/deletepricing',async (req,res)=>{

    try {
        const { ids } = req.body; // array of ids
    
        if (!ids || !ids.length) {
          return res.status(400).json({ message: "No IDs provided" });
        }
    
        await Pricing.deleteMany({
          _id: { $in: ids },
        });
    
        res.json({ data: ids }); // IMPORTANT for react-admin
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
module.exports=router

