const Labs = require ("../models/labsDetails");
const Teacher = require("../models/teachDetails");

const createLab = async(req,res) => {
    const { lname, ldesc, lclass, email } = req.body;
    try {
        const teachCreated = await Teacher.findOne({ email });
        const successfullyCreated = await Labs.create({
            lname,
            ldesc,
            lclass
        });
        
        if(successfullyCreated){
            res.send({ status: "ok"});
            const labID = successfullyCreated._id;
            const teachID = teachCreated._id;
            console.log("labID", labID)
            console.log("teachID", teachID)
            const addedLab = await Teacher.updateOne(
                { _id : teachID},
                {$push : {labArray: labID}}
            )
        }
    } catch (error) {
        console.log(error);
        res.send({ status: "error" });
    }
}

module.exports = {createLab}
