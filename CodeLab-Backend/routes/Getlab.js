const express = require("express")

const router = express.Router();
const Lab = require("../models/labsDetails");
//const Labs = mongoose.model("LabsDetails");

router.get("/LabsCreation/data", (req,res) => {
    Lab.find()
        .then(data => res.json(data))
        .catch(error => res.status(500).json({ error: 'Failed to fetch data'}));
});
  
module.exports = router
