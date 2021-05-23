const sql = require("./db.js");

// constructor
const Room = function (room) {
    this.idroom = room.idroom;
    this.name = room.name;
    this.codroomtype = room.codroomtype;
};

Room.getAll = (result) => {
    sql.query("SELECT * FROM rooms", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("rooms: ", res);
        result(null, res);
    })
}

module.exports = Room
