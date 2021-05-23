const Room = require('../models/room.model.js');

exports.getAll = (req, res) => {
    Room.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: `General error`
            });
        }
        res.send(data);
    });
};
