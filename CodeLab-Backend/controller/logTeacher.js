const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "cgvsjydfvgsvhdt7542gbjsdhsdh37%&%$**bjddsghdshjsjgw56wg";
const Teacher = require("../models/teachDetails");

const logTeacher = async (req, res) => {
  const { email, password } = req.body;
  const user = await Teacher.findOne({ email });

  if (!user) {
    return res.json({ error: "User not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const userDetails = {
      fname: user.fname,
      email: user.email,
    };
    return res.json({
      status: "ok",
      userType: "teacher",
      userDetails,
    });
  }

  res.json({ status: "error", error: "Invalid Password" });
};

module.exports = { logTeacher };
