const express = require("express")

const router = express.Router();
const {joinLab} = require("../controller/joinLab")
router.post("/join-lab", joinLab);
  
module.exports = router