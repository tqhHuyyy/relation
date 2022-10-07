const mongoose = require('mongoose')

const student = new mongoose.Schema({
    nameS: String,
    inforTeacher:[
        {
            type: mongoose.Types.ObjectId, 
            ref:'teacher'
        }
    ]
})
module.exports = mongoose.model('student',student)