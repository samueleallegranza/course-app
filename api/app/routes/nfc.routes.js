module.exports = app => {
    const nfc = require("../controllers/nfc.controller.js");

    // Get the whole list of nfc tags
    app.get("/nfc/get_all", nfc.getAll);

    // Get the list of nfc tags used in an event, given the event id
    app.post("/nfc/get_used", nfc.getUsed);

};