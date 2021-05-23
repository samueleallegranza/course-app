const Nfc = require('../models/nfc.model.js');

exports.getAll = (req, res) => {
    Nfc.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data)
    });
};

exports.getUsed = (req, res) => {
    Nfc.getUsed(req.body.idevent, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data)
    });
};
