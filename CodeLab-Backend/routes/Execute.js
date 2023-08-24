const express = require("express");
const router = express.Router();
const {executeCode} = require("../controller/jdoodleApi")
router.post('/execute-code', executeCode);
module.exports = router
  