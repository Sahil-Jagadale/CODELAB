const express = require("express")

const router = express.Router();

const {regTeacher} = require("../controller/regTeacher")

router.post("/register-teacher", regTeacher);

module.exports = router