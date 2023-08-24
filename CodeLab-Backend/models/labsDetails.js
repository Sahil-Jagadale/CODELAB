const mongoose = require("mongoose");

const labSchema = new mongoose.Schema(
  {
    lname: {
      type: String,
      required: true,
    },
    ldesc: {
      type: String,
      required: true,
    },
    lclass: {
      type: String,
      required: true,
    },
    assignments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AsssignDetails',
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo',
      },
    ],
  },
  { timestamps: true }
);

const Labs = mongoose.model("LabsDetails", labSchema);

module.exports = Labs;
