const express = require("express")

const router = express.Router();

const {updateStudentProfile} = require("../controller/updateProfile")

router.post("/update-student", updateStudentProfile);

module.exports = router