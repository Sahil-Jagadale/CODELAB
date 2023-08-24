const express = require("express")

const router = express.Router();
const {getAssignmentDetails} = require("../controller/assignByID")
router.get("/getassign-byid", getAssignmentDetails);
  
module.exports = router