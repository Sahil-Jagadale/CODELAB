const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    submissionId: Number,
    code: String,
    input: String,
    email: String,
    assID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AssignmentDetails',
    },
    output: String,
  },
  {
    collection: "Submission",
  }
);

module.exports = mongoose.model("Submission", submissionSchema);
