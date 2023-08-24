const express = require("express")

const router = express.Router();

const {updateTeacherProfile} = require("../controller/updateProfile")

router.post("/update-teacher", updateTeacherProfile);

module.exports = router