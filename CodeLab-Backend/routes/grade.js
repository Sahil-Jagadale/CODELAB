const express = require("express")

const router = express.Router();

const {gradeAssignment} = require("../controller/grade")

router.post("/grade", gradeAssignment);

module.exports = router