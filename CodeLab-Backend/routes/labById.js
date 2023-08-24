const express = require("express")

const router = express.Router();
//const Labs = mongoose.model("LabsDetails");
const {getLabDetails} = require("../controller/labByID")
router.get("/getlab-byid", getLabDetails);
  
module.exports = router