module.exports = app => {

    const jwt = require('jsonwebtoken');
    const Student = require('../models/student.model');
    const Admin = require('../models/admin.model');

    const accessTokenSecret = 'youraccesstokensecret';


    const authAdminJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };

    app.post('/login/student', (req, res) => {
        // Read username and password from request body
        const { username, password } = req.body;
        const role = "student"

        // Check if credentials are correct
        Student.auth(username, password, (query_err, query_res) => {
            if (query_err) {
                // An error occurred: invalid credentials or DB error
                res.status(401).send();
            } else {
                // Generate an access token
                const accessToken = jwt.sign({ username: username, role: role }, accessTokenSecret);
                res.send({ 
                    accessToken: accessToken
                });
            }
        })
    });

    app.post('/login/admin', (req, res) => {
        // Read username and password from request body
        const { username, password } = req.body;
        const role = "admin"

        // Check if credentials are correct
        Admin.auth(username, password, (query_err, query_res) => {
            if (query_err) {
                // An error occurred: invalid credentials or DB error
                res.status(401).send();
            } else {
                // Generate an access token
                const accessToken = jwt.sign({ username: username, role: role }, accessTokenSecret);
                res.send({
                    accessToken: accessToken
                });
            }
        })
    });

};