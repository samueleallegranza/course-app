module.exports = app => {
    const events = require('../controllers/event.controller.js');
    const withAuth = require('../auth/middleware.js');

    // Check if there's an ongoing event
    app.get("/event/ongoing", events.isAnyOngoing);

    // Get the list of participants of a specific event
    app.post("/event/get_participants", events.getParticipants);

    // set presence of a participant, specifing the id of the nfc card
    app.post("/event/set_presence", events.setPresence);

    // Get a screenshot of the participants' positions during an event
    app.post("/event/get_screenshot", events.getScreenshot);

    // Get event list including count of occupied spots
    // app.get("/event/get_all", withAuth, events.getAll);
    app.get("/event/get_all", events.getAll);

    // Get event list including count of occupied spots
    app.post("/event/get_schedule", events.getSchedule);

    // Subscibe an user to an event, given the username and event id
    app.post("/event/is_subscribed", events.isSubscribed);

    // Subscibe an user to an event, given the username and event id
    app.post("/event/subscribe", events.subscribe);

    // Get list of events which the user is subscribed to
    app.post("/event/get_subscriptions", events.getSubscriptions);

    // Delete subscription given username
    app.post("/event/del_subscription", events.delSubscriptions);

    // Delete subscription given username
    app.post("/event/get_lessonlist", events.getLessonList);
}