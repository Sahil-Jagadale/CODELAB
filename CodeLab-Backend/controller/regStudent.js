const bcrypt = require("bcryptjs");
const Student = require("../models/userDetails");

const regStudent = async(req,res)=>{

    const { rollno, fname, email, password, sclass } = req.body;

    const encryptedPass = await bcrypt.hash(password,10)
    try {
        const olduser = await Student.findOne({ email });

        if(olduser) {
            return res.send({ error: "User already exists" })
        }
        await Student.create({
            rollno,
            fname,
            email,
            password:encryptedPass,
            sclass,
        });
        res.send({status:"ok"})
    } catch (error) {
        res.send({status:"error"})
    }
}

module.exports = {regStudent}