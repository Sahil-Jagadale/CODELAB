const Student = require("../models/userDetails");

const gradeAssignment = async (req, res) => {
  try {
    const { studID, assID, labID, marks } = req.body;

    const student = await Student.findOneAndUpdate(
      {
        _id: studID,
        "labs.labId": labID,
        "labs.assignments.asigid": assID
      },
      {
        $set: {
          "labs.$[lab].assignments.$[assign].graded": 1,
          "labs.$[lab].assignments.$[assign].marks": marks
        }
      },
      {
        arrayFilters: [
          { "lab.labId": labID },
          { "assign.asigid": assID }
        ],
        new: true
      }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found or assignment not found in the specified lab" });
    }

    res.json({ message: "Assignment graded successfully", student });
  } catch (error) {
    res.status(500).json({ error: "Error grading assignment" });
  }
};

module.exports = { gradeAssignment };
