const express = require("express")

const router = express.Router();

const {getJoinedLabsByStudent} = require("../controller/labjoinedbystud")

router.post("/joined-labs-by-stud", getJoinedLabsByStudent);

module.exports = router