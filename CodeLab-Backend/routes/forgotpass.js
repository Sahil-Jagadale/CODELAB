const express = require("express")

const router = express.Router();

const {generateAndSendOTP} = require("../controller/forgotPassword")

router.post("/forgot-password", generateAndSendOTP);

module.exports = router