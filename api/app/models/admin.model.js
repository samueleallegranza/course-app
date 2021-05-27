const sql = require("./db.js");

const Admin = function (admin) {
    this.idadmin = adimn.idadmin;
    this.full_name = admin.full_name;
    this.username = admin.username;
    this.pwd_hash = admin.pwd_hash;
}

Admin.auth = (username, pwd_hash, result) => {
    sql.query(`SELECT * FROM admins WHERE username='${username}' AND pwd_hash='${pwd_hash}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length < 1) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`authenticated admin ${username}`);
        result(null, res);
    });
};

module.exports = Admin;