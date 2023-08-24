const express = require("express");
const router = express.Router();
const { getStudentDetails } = require("../controller/getStudent");

router.post("/get-student", getStudentDetails);
//router.get("/teachers/:teacherId", getTeacherDetails);

module.exports = router;
