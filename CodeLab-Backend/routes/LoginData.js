const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "cgvsjydfvgsvhdt7542gbjsdhsdh37%&%$**bjddsghdshjsjgw56wg";
const router = express.Router();
const Student = require("../models/userDetails");
const Teacher = require("../models/teachDetails");

router.post("/user-data", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const useremail = user.email;
  
      const userData = await Student.findOne({ email: useremail });
      const teacherData = await Teacher.findOne({ email: useremail });
  
      if (userData) {
        const responseData = {
          status: "ok",
          data: {
            fname: userData.fname,
            email: userData.email,
            userType: "student",
          },
        };
  
        res.send(responseData);
      } else if (teacherData) {
        const responseData = {
          status: "ok",
          data: {
            fname: teacherData.fname,
            email: teacherData.email,
            userType: "teacher",
          },
        };
  
        res.send(responseData);
      } else {
        res.send({ status: "error", data: "User not found" });
      }
    } catch (error) {
      res.send({ status: "error", data: error });
    }
});  

module.exports = router