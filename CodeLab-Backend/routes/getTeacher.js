const express = require("express");
const router = express.Router();
const { getTeacherDetails } = require("../controller/getTeacher");

router.post("/get-teacher", getTeacherDetails);
//router.get("/teachers/:teacherId", getTeacherDetails);

module.exports = router;
