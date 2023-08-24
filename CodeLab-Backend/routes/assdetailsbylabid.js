const express = require("express")

const router = express.Router();
const {getLabAssignmentsWithDetails} = require("../controller/asswithdetailsbylabid")
router.post("/getassigndetails-by-labid", getLabAssignmentsWithDetails);
  
module.exports = router