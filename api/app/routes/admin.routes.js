module.exports = app => {
    const admin = require("../controllers/admin.controller.js");

    // Authenticate a student, given password (hashed) and its username
    app.post("/admin/auth", admin.auth);

}