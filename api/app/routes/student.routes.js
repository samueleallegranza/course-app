module.exports = app => {
    const students = require("../controllers/student.controller.js");

    // Create a new student
    app.post("/students/create", students.create);

    // Retrieve all students
    app.get("/students/get_all", students.findAll);

    // Retrieve a single student with studentId
    app.get("/students/get_single/:studentId", students.findOne);

    // // Update a single with studentId
    // app.put("/students/:studentId", students.update);

    // Delete a student with studentId
    app.get("/students/delete/:studentId", students.delete);

    // // Delete all students
    // app.delete("/students", students.deleteAll);
};