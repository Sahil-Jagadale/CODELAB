const express = require("express")

const router = express.Router();

const {logTeacher} = require("../controller/logTeacher")

router.post("/login-teacher", logTeacher);

module.exports = router