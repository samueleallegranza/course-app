module.exports = app => {
    const withAuth = require('../auth/middleware.js');

    app.get('/checkToken', withAuth, function(req, res) {
        res.sendStatus(200);
    });

}