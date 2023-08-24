const mongoose = require("mongoose");

const teachDetailsSchema = new mongoose.Schema(
    {
        fname: String,
        email: { type: String, unique: true },
        password: String,
        labArray: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "LabsDetails"
        }],
        otp: {
            type: String,
            default: null,
        },
    },
    {
        collection: "TeachInfo",
    }
);

module.exports = mongoose.model("TeachInfo",teachDetailsSchema);