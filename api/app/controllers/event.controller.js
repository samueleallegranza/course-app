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

// Check if user is subscribed to an event
exports.isSubscribed = (req, res) => {
    const idevent = req.body.idevent;
    const username = req.body.username;
    Event.isSubscribed(idevent, username, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while checking subscription"
            });
        else {
            res.send(JSON.stringify({"isSubscribed": data}))
        }
    });
};


// Subscibe an user to an event, given the username and event id
exports.subscribe = (req, res) => {
    const idevent = req.body.idevent;
    const username = req.body.username;
    Event.subscribe(idevent, username, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while subscribing user"
            });
        else res.send(data)
    });
};


// Get list of events which the user is subscribed to
exports.getSubscriptions = (req, res) => {
    const username = req.body.username;
    Event.getSubscriptions(username, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while getting subscriptions list"
            });
        else res.send(data)
    });
};


// Delete subscription given username and idevent
exports.delSubscriptions = (req, res) => {
    const username = req.body.username;
    const idevent = req.body.idevent;
    Event.delSubscriptions(idevent, username, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while deleting subscription"
            });
        else res.send(data)
    });
};


// Get list of lessons of a participant, given username and idevent
exports.getLessonList = (req, res) => {
    const username = req.body.username;
    const idevent = req.body.idevent;
    Event.getLessonList(idevent, username, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while getting list of lessons"
            });
        else res.send(data)
    });
};
