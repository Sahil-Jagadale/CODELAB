const express = require("express")

const router = express.Router();

const {createAssignment} = require("../controller/createAssignment")

router.post("/assignment-creation", createAssignment);

module.exports = router