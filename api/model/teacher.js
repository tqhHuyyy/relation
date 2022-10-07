const mongoose = require('mongoose')
const teacher = new mongoose.Schema({
    nameT: String,
    inforStudent:[
        {
            type: mongoose.Types.ObjectId, 
            ref:'student'
        }
    ]
})
module.exports = mongoose.model('teacher',teacher)
