const express = require("express")

const router = express.Router();

const {logStudent} = require("../controller/logStudent")

router.post("/login-student", logStudent);

module.exports = router