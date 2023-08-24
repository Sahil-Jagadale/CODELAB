const Student = require("../models/userDetails");
const AsssignDetails = require("../models/assignmentDetails");
const Labs = require("../models/labsDetails");

const createAssignment = async (req, res) => {
  try {
    const { no, name, problem_statement, description, language, input, output, labId } = req.body;

    const assignment = await AsssignDetails.create({
      no,
      name,
      problem_statement,
      description,
      language,
      input,
      output,
      lab: labId 
    });

    if (!assignment) {
      return res.send({ status: "error" });
    }

    const labAssignment = {
      asigid: assignment._id, // Include the assignment ID
      status: 0,
      graded: 0,
      marks: 0,
      submissionId: ""
    };

    const lab = await Labs.findById(labId);
    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }
    lab.assignments.push(assignment._id); // Push the assignment into the assignments array of the lab
    await lab.save();

    const students = await Student.find({ "labs.labId": labId });

    if (!students) {
      return res.send({ status: "ok", assignment });
    }

    students.forEach(async (student) => {
      const labIndex = student.labs.findIndex((lab) => lab.labId.toString() === labId);

      if (labIndex !== -1) {
        student.labs[labIndex].assignments.push(labAssignment);
        await student.save();
      }
    });

    res.json({ status: "ok", assignment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createAssignment };
