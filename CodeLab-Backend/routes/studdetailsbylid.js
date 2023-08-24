const express = require("express")

const router = express.Router();
const {getLabStudentsWithAssignments} = require("../controller/studdetailsbylid");
router.post("/studdetails-by-lid", getLabStudentsWithAssignments);
  
module.exports = router