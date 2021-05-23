module.exports = app => {
    const events = require('../controllers/event.controller.js');

    // Check if there's an ongoing event
    app.get("/event/ongoing", events.isAnyOngoing);

    // Get the list of participants of a specific event
    app.post("/event/get_participants", events.getParticipants);

    // set presence of a participant, specifing the id of the nfc card
    app.post("/event/set_presence", events.setPresence);

    // Get a screenshot of the participants' positions during an event
    app.post("/event/get_screenshot", events.getScreenshot);

    // Get event list including count of occupied spots
    app.get("/event/get_all", events.getAll);

    // Get event list including count of occupied spots
    app.post("/event/get_schedule", events.getSchedule);

}