const Student = require("../models/student.model.js");

const jwt = require('jsonwebtoken');
const jwt_secret = "secret_test";

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request (to be realistic, every field should be checked)
    if (!req.body || !req.body.pwd_hash) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a student
    const student = new Student({
        username: req.body.username,
        full_name: req.body.full_name,
        email: req.body.email,
        birth: req.body.birth,
        pwd_hash: req.body.pwd_hash,
        login_type: req.body.login_type,
        login_id: req.body.login_id
    });

    // Save Student in the database
    Student.create(student, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        else res.send(data);
    });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Students with a customerId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.params.studentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student with id " + req.params.studentId
                });
            }
        } else res.send(data);
    });
};

// // Update a Customer identified by the customerId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//     }

//     Customer.updateById(
//         req.params.customerId,
//         new Customer(req.body),
//         (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.status(404).send({
//                         message: `Not found Customer with id ${req.params.customerId}.`
//                     });
//                 } else {
//                     res.status(500).send({
//                         message: "Error updating Customer with id " + req.params.customerId
//                     });
//                 }
//             } else res.send(data);
//         }
//     );
// };

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Student.remove(req.params.studentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.params.studentId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Student with id " + req.params.studentId
                });
            }
        } else res.send({ message: `Student was deleted successfully!` });
    });
};

// // Delete all Customers from the database.
// exports.deleteAll = (req, res) => {
//     Customer.removeAll((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all customers."
//             });
//         else res.send({ message: `All Customers were deleted successfully!` });
//     });
// };


exports.auth = (req, res) => {
    const { username, password } = req.body;
    const role = "student"

    // Check if credentials are correct
    console.log(`Authentication of '${username}' with password '${password}'`);
    Student.auth(username, password, (err, data) => {
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
