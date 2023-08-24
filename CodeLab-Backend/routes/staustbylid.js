const express = require("express")

const router = express.Router();
const {getAssignments} = require("../controller/studentstatusbyLabid");
router.post("/status-by-lid", getAssignments);
  
module.exports = router