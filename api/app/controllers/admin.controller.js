const Admin = require("../models/admin.model.js");

const jwt = require('jsonwebtoken');
const jwt_secret = "secret_test";

exports.auth = (req, res) => {
    const { username, password } = req.body;
    const role = "admin"
    console.log(password)

    // Check if credentials are correct
    console.log(`Authentication of admin '${username}' with password '${password}'`);
    Admin.auth(username, password, (err, data) => {
        if (err) {
            // An error occurred: invalid credentials or DB error
            res.status(401).send();
        } else {
            // Issue token
            const payload = { username, role };
            const token = jwt.sign(payload, jwt_secret, {
                expiresIn: '1h'
            });
            res.cookie('token', token, { httpOnly: true })
                .sendStatus(200);
        }
    })
};
