module.exports = (app) => {
    const device = require("../controllers/device.controller.js");

    // Authenticate a device, send its associated room id
    app.post("/device/auth", device.auth);

    // Movement detected, check if valid and send relative informations
    app.post('/device/movement', device.movement);
};