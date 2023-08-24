const express = require("express")

const router = express.Router();
//const Labs = mongoose.model("LabsDetails");
const {getLabsByTeacherEmail} = require("../controller/lab-by-teachid");
router.post("/getlab-teachid", getLabsByTeacherEmail);
  
module.exports = router