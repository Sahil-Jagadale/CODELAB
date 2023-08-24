const express = require("express")

const router = express.Router();

const {addLabToStudent} = require("../controller/addLabToStudent")

router.post("/add-lab-stud", addLabToStudent);

module.exports = router