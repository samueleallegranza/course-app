module.exports = app => {
    const room = require('../controllers/room.controller.js');

    // Get the list of rooms
    app.get("/room/get_all", room.getAll);

}