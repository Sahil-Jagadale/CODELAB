const Teacher = require("../models/teachDetails");
const LabsDetails = require("../models/labsDetails");

const getLabsByTeacherEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const teacher = await Teacher.findOne({ email }).populate("labArray");

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const labs = teacher.labArray;

    res.json({ labs });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving labs" });
  }
};

module.exports = { getLabsByTeacherEmail };
