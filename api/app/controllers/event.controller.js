const Event = require('../models/event.model.js');

// Check if there's an ongoing event
exports.isAnyOngoing = (req, res) => {
    Event.isAnyOngoing((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data)
    });
};

// Get the list of participants, given a certain event id
exports.getParticipants = (req, res) => {
    Event.getParticipants(req.body.eventid, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data)
    });
};

// set presence of a participant, specifing the id of the nfc card
exports.setPresence = (req, res) => {
    if (!req.body.idnfc) {
        res.status(400).send({
            message: "Content can not be empty or null!"
        });
    }

    Event.setPresence(req.body.idparticipant, req.body.idnfc, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        else res.send(data)
    });
};

// Get a screenshot of the participants' positions during an event
exports.getScreenshot = (req, res) => {
    Event.getScreenshot(req.body.idevent, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while getting screenshot"
            });
        else res.send(data)
    });
};

// Get event list including count of occupied spots
exports.getAll = (req, res) => {
    Event.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while getting event list"
            });
        else res.send(data)
    });
};

// Get template schedule, given idtemplate
exports.getSchedule = (req, res) => {
    const idtemplate = req.body.idtemplate
    Event.getSchedule(idtemplate, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while getting schedule"
            });
        else res.send(data)
    });
};
