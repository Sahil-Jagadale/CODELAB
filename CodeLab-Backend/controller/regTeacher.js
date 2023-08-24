const bcrypt = require("bcryptjs");
const Teacher = require("../models/teachDetails");

const regTeacher = async(req,res)=>{

    const { fname, email, password } = req.body;

    const encryptedPass = await bcrypt.hash(password,10)
    try {
        const olduser = await Teacher.findOne({ email });

        if(olduser) {
            return res.send({ error: "User already exists" })
        }
        const teachCreate = await Teacher.create({
            fname,
            email,
            password:encryptedPass,
        });
        res.send({status:"ok"})
        const tecahID = teachCreate._id;
        console.log(tecahID);
    } catch (error) {
        res.send({status:"error"})
    }
}

module.exports = {regTeacher}