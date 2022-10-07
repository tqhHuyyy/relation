module.exports = function(app) {
    var oneToOne = require('../controller/oneToOne')
    var oneToMany = require('../controller/oneToMany')
    //oneToOne
    app.route('/onetoone/addOneData')
    .post(oneToOne.addOneData)
    app.route('/onetoone/addTeacher')
    .post(oneToOne.addTeacher)
    app.route('/onetoone/addTeacherWithLink')
    .post(oneToOne.addTeacherWithLink)
    app.route('/onetoone/deleteData')
    .delete(oneToOne.deleteData)
    app.route('/onetoone/deleteLink')
    .delete(oneToOne.deleteLink)
    app.route('/onetoone/updateTeacher')
    .put(oneToOne.updateTeacher)
    //oneToMany
    app.route('/onetomany/createnewdata')
    .post(oneToMany.createNewData)
}