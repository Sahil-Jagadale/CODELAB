const express = require("express");
const router = express.Router();
const { getSubmissionDetails } = require("../controller/subdetailsbyassid");

router.post("/sub-by-aid", getSubmissionDetails);

module.exports = router;
