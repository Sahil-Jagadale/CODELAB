// resetPassword.js

const bcrypt = require("bcryptjs");
const Student = require("../models/userDetails");
const Teacher = require("../models/teachDetails");

const resetPassword = async (req, res) => {
  const { email, userType, otp, password } = req.body;

  try {
    let User;

    if (userType === "student") {
      User = Student;
    } else if (userType === "teacher") {
      User = Teacher;
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Hash the new password
    const encryptedPass = await bcrypt.hash(password, 10);
    user.password = encryptedPass;
    user.otp = null; // Clear the OTP after resetting the password
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting password" });
  }
};

module.exports = {resetPassword};
