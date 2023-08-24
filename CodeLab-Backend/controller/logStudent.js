const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "cgvsjydfvgsvhdt7542gbjsdhsdh37%&%$**bjddsghdshjsjgw56wg";
const Student = require("../models/userDetails");

const logStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Student.findOne({ email });
    if (!user) {
      return res.send({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      return res.json({
        status: "ok",
        userType: "student",
        data: {
          user: {
            _id: user._id,
            rollno: user.rollno,
            fname: user.fname,
            email: user.email,
            sclass: user.sclass,
            // Include other required fields here
          },
        },
      });
    }
    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    res.json({ status: "error", error: "Login failed" });
  }
};

module.exports = { logStudent };
