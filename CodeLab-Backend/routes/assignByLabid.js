const express = require("express")

const router = express.Router();
const {getAllAssignmentDetailsByLabId} = require("../controller/getAssignmentByLabid")
router.post("/getassign-by-labid", getAllAssignmentDetailsByLabId);
  
module.exports = router  