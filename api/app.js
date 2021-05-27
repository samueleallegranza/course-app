const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mqtt = require('./app/mqtt/mqtt');

const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// cookie-parser
app.use(cookieParser());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to course-app's API." });
});

// routes
require("./app/routes/customer.routes.js")(app);
require("./app/routes/student.routes.js")(app);
require("./app/routes/admin.routes.js")(app);
require("./app/routes/event.routes.js")(app);
require("./app/routes/nfc.routes.js")(app);
require("./app/routes/device.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/auth.routes.js")(app);

// auth
// require("./app/auth/jwt.js")(app);

// set port, listen for requests
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
