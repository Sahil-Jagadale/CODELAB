const express = require("express")

const router = express.Router();

const {regStudent} = require("../controller/regStudent")

router.post("/register-student", regStudent);

module.exports = router