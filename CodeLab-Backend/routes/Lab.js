const express = require("express")

const router = express.Router();

const {createLab} = require("../controller/createLab")

router.post("/lab-creation", createLab);

module.exports = router