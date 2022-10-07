const student = require('../model/student')
const teacher = require('../model/teacher')

exports.createNewData = async(req, res) =>{
    try {
        const {nameS, nameT} = req.body
        console.log(nameS.length,"nameS");
        let arrId = []
        for(let i= 0; i< nameS.length ; i++){
            const data = await student.create({nameS: nameS[i], inforTeacher:[]})
            arrId.push(data._id)
        }
        console.log(arrId, "arrId")
        const dataTeacher = await teacher.create({nameT: nameT, inforStudent:arrId},{new: true})
        console.log(dataTeacher[0]._id,"dddd")
        let arrStudent = []
        for(let i = 0; i <nameS.length; i++){
            const dataStudent = await student.findByIdAndUpdate(arrId[i],{inforTeacher: dataTeacher[0]._id},{new:true})
            arrStudent.push(dataStudent)
        }
        console.log("f");
        res.send({arrStudent, dataTeacher,message:"success"})
    } catch (error) {
        res.send(error)
    }
}
exports.deleteDuplicateStudent=async(req, res) =>{
    try {
        const {idS, idT} = req.body
        const data = await teacher.findById(idT)
        let arrId = data.inforStudent
        const dataTeacher = await teacher.updateMany({$pull:{inforStudent:{$in:idS}}})
        let arrU = []
        for(let i =0; i< idS.length; i++){
            const dataStudent = await student.findByIdAndUpdate(arrId[i],{inforTeacher:[]})
            arrU.push(dataStudent)
        }
        res.send({dataTeacher, arrU})
    } catch (error) {
        res.send(error)
    }
}