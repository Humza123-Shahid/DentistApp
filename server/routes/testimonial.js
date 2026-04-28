const express = require('express')
const router = express.Router()
const Testimonial = require('../models/Testimonial')


router.get('/fetchalltestimonials', async (req, res) => {
    
    // const testimonials=await Testimonial.find({});
    // res.json(testimonials);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const testimonials = await Testimonial.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Testimonial.countDocuments(filter);

  res.json({ data: testimonials, total });
})
router.get('/fetchmanytestimonials', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const testimonials = await Testimonial.find({
        _id: { $in: ids }
      });

      return res.json(testimonials);
    }

    // fallback → normal getList
    const testimonials = await Testimonial.find();
    res.json(testimonials);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsingletestimonial/:id", async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  res.json(testimonial);
});
router.post('/addtestimonial', async (req, res) => {

    // const { title,teaser } = req.body;
        const { patientName, profession, comment, reviewDate } = req.body;

    console.log(patientName, profession);
    const testimonial = new Testimonial({ 
       patientName, profession, comment, reviewDate
     })
    const savedtestimonial=await testimonial.save();
    res.json(savedtestimonial);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatetestimonial/:id',async (req,res)=>{
    const {patientName, profession, comment, reviewDate}=req.body;
    const newtestimonial={};
    if(patientName){newtestimonial.patientName=patientName};
    if(profession){newtestimonial.profession=profession};
    if(comment){newtestimonial.comment=comment};
    if(reviewDate){newtestimonial.reviewDate=reviewDate};

    let testimonial=await Testimonial.findById(req.params.id);
    if(!testimonial){return res.status(404).send("Not Found")}


    testimonial =await Testimonial.findByIdAndUpdate(req.params.id,{$set:newtestimonial},{new:true})
    res.json({success: true, data:Testimonial});
})

// })
router.delete("/deletetestimonial", async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Testimonial.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router
