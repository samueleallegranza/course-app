const sql = require("./db.js");

// constructor
const Nfc = function (nfc) {
    this.id = nfc.id;
};

Nfc.getAll = (result) => {
    sql.query("SELECT idnfc FROM nfc_tags", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        const nfclist = res.map((elm, idx) => {
            return elm.idnfc;
        })
        console.log("nfc tags: ", nfclist);
        result(null, nfclist);
    })
}

Nfc.getUsed = (idEvent, result) => {
    sql.query(`SELECT codnfc FROM participants WHERE codnfc IS NOT NULL AND codevent=${idEvent}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        const nfclist = res.map((elm, idx) => {
            return elm.codnfc;
        })
        console.log("used nfc tags: ", nfclist);
        result(null, nfclist);
    })
}

module.exports = Nfc