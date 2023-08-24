const Labs = require("../models/labsDetails");
const Student = require("../models/userDetails");

const getLabStudentsWithAssignments = async (req, res) => {
  const { labId } = req.body;

  try {
    const lab = await Labs.findById(labId).populate({
      path: 'students',
      select: 'fname rollno labs',
      populate: {
        path: 'labs.assignments',
        model: 'UserInfo',
        select: 'asigid status graded marks submissionId'
      }
    });

    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }

    const students = lab.students.map(student => {
      const { fname, rollno, labs } = student;
      const labInfo = labs.find(lab => lab.labId === labId);
      const assignments = labInfo ? labInfo.assignments : [];
      return {
        fname,
        rollno,
        assignments
      };
    });

    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving lab students with assignments" });
  }
};

module.exports = { getLabStudentsWithAssignments };
