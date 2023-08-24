const express = require("express");
const router = express.Router();
const {submitCode} = require("../controller/saveRunSubmit")
router.post('/submit', submitCode);
  module.exports = router
  