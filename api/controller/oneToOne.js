const student = require('../model/student')
const teacher = require('../model/teacher')
//thêm mới sinh viên và giáo viên rồi tạo liên kết mới giứa chúng:
exports.addOneData = async (req, res) => {
	try {
		const { nameS, nameT } = req.body
		const addStudent = await student.create({  nameS: nameS, inforTeacher: [] })
		const addTeacher = await teacher.create({ nameT: nameT, inforStudent: addStudent._id })
		console.log(addTeacher._id,"huyyyyy");
		const updateStudent = await student.findByIdAndUpdate(addStudent._id, { inforTeacher: addTeacher._id },{new: true})
		console.log("aaaa")
		res.send({updateStudent, addTeacher })
	} catch (error) {
		res.send(error)
	}
}
//tạo mới một giáo viên
exports.addTeacher = async(req, res) =>{
	try {
		const {nameT} = req.body
		const data = await teacher.create({nameT: nameT})
		res.send({data, message:"success"})
	} catch (error) {
		res.send(error)
	}
}
//thêm giáo viên với học sinh cũ nếu có liên kết bỏ liên kết cũ đi

exports.addTeacherWithLink = async (req, res) => {
	try {
		const { idStudent,nameT} = req.body
		const addTeacher = await teacher.create({ nameT: nameT, inforStudent: idStudent })
		const data = await student.findById(idStudent)
		if(data.inforTeacher.length > 0){
			await student.findByIdAndUpdate(idStudent,{inforTeacher:[]})
			const updateStudent = await student.findByIdAndUpdate(idStudent,{ inforTeacher: addTeacher._id},{new: true})
			return res.send({  updateStudent, addTeacher})
		} else{
			const updateStudent = await student.findByIdAndUpdate(idStudent, {inforTeacher: addTeacher._id},{new: true})
			return res.send({ updateStudent, addTeacher })
		}
	} catch (error) {
		res.send(error)
	}
}
//xóa liên kết của giáo viên và sinh viên đã liên kết từ trước:
exports.deleteData= async (req, res) =>{
	try {
		const {idT} = req.body
		const findTeacher = await teacher.findByIdAndUpdate(idT,{inforStudent:[]})
		const findStudent = await student.findByIdAndUpdate(findTeacher._inforStudent,{inforTeacher:[]})
		res.send({findTeacher, findStudent})
	} catch (error) {
		res.send(error)
	}
}
//xóa sinh viên và xóa liên kết ở giáo viên đã liên kết với nó:
exports.deleteLink = async (req, res ) =>{
	try {
		const { studentId } = req.body
		const data = await student.findByIdAndDelete(studentId)
		if(data.inforTeacher.length > 0){
			const deleteLink = await teacher.findByIdAndUpdate(data.inforTeacher,{inforStudent: []},{new: true})
			res.send({ data, deleteLink })
		}else{
			res.send({ data})
		}	
	} catch (error) {
		res.send(error)
	}
}
//update giáo viên liên kết với học sinh mới và xóa liên kết với học sinh cũ:
exports.updateTeacher = async (req, res) =>{
	try {
		const {idStudent, idTeacher} = req.body
		const oldId = await teacher.findById(idTeacher)
		await teacher.findByIdAndUpdate(idTeacher,{inforStudent:[]})
		const findTeacher = await teacher.findByIdAndUpdate(idTeacher,{inforStudent: idStudent},{new:true})
		const findStudent = await student.findByIdAndUpdate(oldId,{inforTeacher:[]},{new: true})
		res.send({findStudent, findTeacher})
	} catch (error) {
		res.send(error)
	}
}

