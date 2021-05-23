const sql = require("./db.js");

// constructor
const Student = function (student) {
    this.username = student.username;
    this.full_name = student.full_name;
    this.email = student.email;
    this.birth = student.birth;
    this.pwd_hash = student.pwd_hash;
    this.login_type = student.login_type;
    this.login_id = student.login_id;
};

Student.create = (newStudent, result) => {
    sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created student: ", { id: res.insertId, ...newStudent });
        result(null, { id: res.insertId, ...newStudent });
    });
};

Student.getAll = result => {
    sql.query("SELECT * FROM students", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("students: ", res);
        result(null, res);
    });
};

Student.findById = (studentId, result) => {
    sql.query(`SELECT * FROM students WHERE id = ${studentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Student with the id
        result({ kind: "not_found" }, null);
    });
};


// Customer.updateById = (id, customer, result) => {
//     sql.query(
//         "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
//         [customer.email, customer.name, customer.active, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found Customer with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated customer: ", { id: id, ...customer });
//             result(null, { id: id, ...customer });
//         }
//     );
// };

Student.remove = (id, result) => {
    sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Student with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted student with id: ", id);
        result(null, res);
    });
};

// Customer.removeAll = result => {
//     sql.query("DELETE FROM customers", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log(`deleted ${res.affectedRows} customers`);
//         result(null, res);
//     });
// };

module.exports = Student;
