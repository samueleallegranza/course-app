module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    // Login a user
    app.post("/auth/login", auth.login);

};