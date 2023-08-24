const express = require("express")

const router = express.Router();
const Assignment = require("../models/assignmentDetails");
//const Labs = mongoose.model("LabsDetails");

router.get("/AssignCreation/data", (req,res) => {
    Assignment.find()
        .then(data => res.json(data))
        .catch(error => res.status(500).json({ error: 'Failed to fetch data'}));
});
module.exports = router