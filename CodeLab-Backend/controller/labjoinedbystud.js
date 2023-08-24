const Student = require("../models/userDetails");
const Labs = require("../models/labsDetails");

const getJoinedLabsByStudent = async (req, res) => {
  const { email } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const labIds = student.labs.map((lab) => lab.labId);

    const joinedLabs = await Labs.find({ _id: { $in: labIds } }, {
      _id: 1,
      lname: 1,
      ldesc: 1,
      lclass: 1,
      assignments: 1,
    });

    res.json({ joinedLabs });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving joined labs" });
  }
};

module.exports = { getJoinedLabsByStudent };
