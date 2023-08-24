const Labs = require("../models/labsDetails");
const Student = require("../models/userDetails");
const Assignment = require("../models/assignmentDetails");

const getLabAssignmentsWithDetails = async (req, res) => {
  const { email, labId } = req.body;

  try {
    const lab = await Labs.findById(labId);

    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const assignmentIds = lab.assignments.map((assignment) => assignment.toString());

    const assignmentsWithDetails = [];

    for (const labItem of student.labs) {
      if (labItem.labId === labId) {
        for (const assignment of labItem.assignments) {
          if (assignmentIds.includes(assignment.asigid.toString())) {
            const assignmentDetails = await Assignment.findById(assignment.asigid).select('-students');
            if (assignmentDetails) {
              assignmentsWithDetails.push({
                assignmentId: assignment.asigid,
                status: assignment.status,
                graded: assignment.graded,
                marks: assignment.marks,
                submissionId: assignment.submissionId,
                assignmentDetails: assignmentDetails,
              });
            }
          }
        }
      }
    }

    res.json({ assignmentsWithDetails });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving lab assignments with details" });
  }
};

module.exports = { getLabAssignmentsWithDetails };
