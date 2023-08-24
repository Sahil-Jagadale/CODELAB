const mongoose = require ("mongoose");

const userDetailsSchema = new mongoose.Schema(
    {
        rollno: String,
        fname: String,
        email: { type: String, unique: true },
        password: String,
        sclass: String,
        labs: [
            {
              labId: String,
              assignments: [
                {
                  asigid: {type: mongoose.Schema.Types.ObjectId, ref: "AssignmentDetails"},
                  status: Number, // 0 or 1
                  graded: Number, // 0 or 1
                  marks: Number,
                  submissionId: Number
                }
              ]
            }
          ],
        otp: {
          type: String,
          default: null,
        },
    },
    {
        collection: "UserInfo",
    }
);

module.exports = mongoose.model("UserInfo",userDetailsSchema);