const mongoose = require("mongoose");

const assignmentDetailsSchema = new mongoose.Schema(
    {
        no: Number,
        name: String,
        problem_statement: String,
        description: String,
        language: String,
        input:String,
        output:String,
        lab: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lab',
        },
        students: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'UserInfo',
            },
        ],
    },
    {
        collection: "AsssignDetails",
    }
);

module.exports = mongoose.model("AsssignDetails",assignmentDetailsSchema);