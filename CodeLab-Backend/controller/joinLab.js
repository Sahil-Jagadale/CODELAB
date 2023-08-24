const Student = require("../models/userDetails");
const Labs = require("../models/labsDetails");
const AsssignDetails = require("../models/assignmentDetails");

const joinLab = async (req, res) => {
  try {
    const { email, labId } = req.body;

    // Find the lab by ID to validate if it exists
    const lab = await Labs.findById(labId);

    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }

    // Find the student by email or any other unique identifier
    const student = await Student.findOne({email: email});

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (lab.students.includes(student._id)) {
      return res.status(400).json({ error: "Student already joined the lab" });
    }
    lab.students.push(student._id);
    await lab.save();
    // Check if the student is already part of the lab
    const labIndex = student.labs.findIndex((lab) => lab.labId === labId);

    if (labIndex !== -1) {
      return res.status(400).json({ error: "Already joined the lab" });
    }

    // Create an array of assignment IDs associated with the lab
    const assignmentIds = lab.assignments.map((assignment) => assignment._id);

    // Create an array of lab assignments to push to the student's assignment array
    const labAssignments = assignmentIds.map((assignmentId) => ({
      asigid: assignmentId,
      status: 0,
      graded: 0,
      marks: 0,
      submissionId: ""
    }));

    // Create a new lab object to push to the student's lab array
    const labObject = {
      labId: labId,
      assignments: labAssignments
    };

    // Push the lab to the student's lab array
    student.labs.push(labObject);

    // Save the updated student document
    await student.save();

    res.json({ status: "ok", lab: labObject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { joinLab };
