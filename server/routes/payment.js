const express = require('express')
const router = express.Router()
const Payment = require('../models/Payment')

router.get('/fetchallpayments', async (req, res) => {
    
    // const payments=await Payment.find({});
    // res.json(payments);
let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const payments = await Payment.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Payment.countDocuments(filter);

  res.json({ data: payments, total });
})
router.get('/fetchmanypayments', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const payments = await Payment.find({
        _id: { $in: ids }
      });

      return res.json(payments);
    }

    // fallback → normal getList
    const payments = await Payment.find();
    res.json(payments);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsinglepayment/:id", async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  res.json(payment);
 
});
router.get('/paymentbypatientId', async (req, res) => {
    // const { filter } = req.query;
    // const { filterObj  } = JSON.parse(filter || '{}');
    
    // const history = await PatientHistory.find({ patient:filterObj.patient });
    // // res.json({ data: history, total: history.length });
    // const formatted = history.map(d => ({ ...d.toObject(), id: d._id.toString() }));

    // //res.set('Content-Range', `patient-history ${from}-${to}/${total}`);
    // res.json(formatted);
    try {
    const {
      patientId,
      _page     = 1,
      _perPage  = 10,
      _sortField = 'createdAt',
      _sortOrder = 'DESC',
      ...otherFilters
    } = req.query;
  console.log(patientId);
    // 1. Build filter
    const filter = { ...otherFilters };
    if (patientId) filter.patientId = patientId;

    // 2. Sorting
    const sortOrder = _sortOrder === 'DESC' ? -1 : 1;
    const sort = { [_sortField]: sortOrder };

    // 3. Pagination
    const skip  = (Number(_page) - 1) * Number(_perPage);
    const limit = Number(_perPage);

    // 4. Query
    const [data, total] = await Promise.all([
      Payment.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Payment.countDocuments(filter),
    ]);
   console.log(data);
    // 5. Map _id → id (react-admin expects "id")
    const formatted = data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

    res.json({ data: formatted, total });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/addpayment',async (req,res)=>{
    try {
        
        let success = false;
        const {patientId,providerId,appointmentId,paymentDate,paymentMethod,paymentType,totalAmount,amount,notes}=req.body;
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        // return res.status(400).json({ success,errors: errors.array() });
        // }
        const payment=new Payment({
           patientId,providerId,appointmentId,paymentDate,paymentMethod,paymentType,totalAmount,amount,notes
        })
        const savedPayment=await payment.save();
        res.json(savedPayment);
        // success=true;
        // res.json({success,data:savedPayment})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Payment using :PUT "/api/payments/updatepayments".Login required
router.put('/updatepayment/:id',async (req,res)=>{
    const {patientId,providerId,appointmentId,paymentDate,paymentMethod,paymentType,totalAmount,amount,notes}=req.body;
    const newPayment={};
    if(patientId){newPayment.patientId=patientId};
    if(providerId){newPayment.providerId=providerId};
    if(appointmentId){newPayment.appointmentId=appointmentId};
    if(paymentDate){newPayment.paymentDate=paymentDate};
    if(paymentMethod){newPayment.paymentMethod=paymentMethod};
    if(paymentType){newPayment.paymentType=paymentType};
    if(totalAmount){newPayment.totalAmount=totalAmount};
    if(amount){newPayment.amount=amount};
    if(notes){newPayment.notes=notes};

    let payment=await Payment.findById(req.params.id);
    if(!payment){return res.status(404).send("Not Found")}


    payment =await Payment.findByIdAndUpdate(req.params.id,{$set:newPayment},{new:true})
    res.json({success: true, data:payment});
})
// ROUTE 4: Delete an existing Payment using :DELETE "/api/payments/deletepayments".Login required
router.delete('/deletepayment',async (req,res)=>{

    try {
        const { ids } = req.body; // array of ids
    
        if (!ids || !ids.length) {
          return res.status(400).json({ message: "No IDs provided" });
        }
    
        await Payment.deleteMany({
          _id: { $in: ids },
        });
    
        res.json({ data: ids }); // IMPORTANT for react-admin
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
module.exports=router

