const express = require("express");
const app = express();
const mongoose=require("mongoose");
app.use(express.json());
const cors = require("cors");
const axios = require('axios');
app.use(cors());

const connectDB = require("./middleware/db");

connectDB();

const labroute = require("./routes/Lab");
const assignmentroute = require("./routes/Assignment");
const studroute = require("./routes/Student");
const teachroute = require("./routes/Teacher");
const slogin = require("./routes/StudLogin");
const tlogin = require("./routes/TeachLogin");
const logindata = require("./routes/LoginData");
const gassignmentroute = require("./routes/Getassignment");
const glabroute = require("./routes/Getlab");
const compilerroute = require("./routes/compiler");
const studlabroute = require("./routes/labStudent");
const getlabbyidroute = require("./routes/labById");
const getassignbyidroute = require("./routes/asignById");
const getassignbylabidroute = require("./routes/assignByLabid");
const joinlabroute = require("./routes/joinLab");
const runroute = require("./routes/Execute");
const saveroute = require("./routes/run-code");
const submitroute = require("./routes/submit");
const forgotPasswordroute = require("./routes/forgotpass");
const resetPasswordroute = require("./routes/resetpass");
const getstudentroute = require("./routes/getStudent");
const getteacherroute = require("./routes/getTeacher");
const getsubdetailsroute = require("./routes/subByAssID");
const graderoute = require("./routes/grade");
const updatestudroute = require("./routes/updateStudProfile");
const updateteachroute = require("./routes/updateTeachProfile");
const statusbylidroute = require("./routes/staustbylid");
const labbyteachidroute = require("./routes/lab-by-teachID");
const joinedlabbystudroute = require("./routes/labjoinbystud");
const assdetailsbylabidroute = require("./routes/assdetailsbylabid");
const studetailsbylid = require("./routes/studdetailsbylid");


require("./models/userDetails");


app.use("/api/v1", labroute);
app.get("/test",(req,res)=>{
    res.json({msg:"working"})
});
app.use("/api/v1", assignmentroute);
app.use("/api/v1", studroute);
app.use("/api/v1", teachroute);
app.use("/api/v1", slogin);
app.use("/api/v1", tlogin);
app.use("/api/v1", logindata);
app.use("/api/v1", gassignmentroute);
app.use("/api/v1", glabroute);
app.use("/api/v1", compilerroute);
app.use("/api/v1", studlabroute);
app.use("/api/v1", getlabbyidroute);
app.use("/api/v1", getassignbyidroute);
app.use("/api/v1", getassignbylabidroute);
app.use("/api/v1", joinlabroute);
app.use("/api/v1", saveroute);
app.use("/api/v1", runroute);
app.use("/api/v1", submitroute);
app.use("/api/v1", forgotPasswordroute);
app.use("/api/v1", resetPasswordroute);
app.use("/api/v1", getstudentroute);
app.use("/api/v1", getteacherroute);
app.use("/api/v1", getsubdetailsroute);
app.use("/api/v1", graderoute);
app.use("/api/v1", updatestudroute);
app.use("/api/v1", updateteachroute);
app.use("/api/v1", statusbylidroute);
app.use("/api/v1", labbyteachidroute);
app.use("/api/v1", joinedlabbystudroute);
app.use("/api/v1", assdetailsbylabidroute);
app.use("/api/v1", studetailsbylid);
  
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>{
    console.log("Server Started");
});