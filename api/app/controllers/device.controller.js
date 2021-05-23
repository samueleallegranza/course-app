const Device = require('../models/device.model.js');

// Mqtt
const mqtt = require('../mqtt/mqtt');
const mqttConn = new mqtt("mqtt://localhost:1883", username = "api", password = "api")


// Check if there's an ongoing event
exports.auth = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Device.auth(username, password, (err, data) => {
        if (err) {
            if (err.kind === "auth_error") {
                res.status(401).send({
                    message: `Wrong credentials for user ${username}.`
                });
            } else {
                res.status(500).send({
                    message: `Authentication error for user ${username}.`
                });
            }
        } else res.send(data);
    });
};


exports.movement = (req, res) => {
    const idnfc = req.body.idnfc;
    const idroom = req.body.idroom;

    if (!idnfc || !idroom) {
        res.status(400).send({
            message: `You must send 'idnfc' and 'idroom' informations`
        });
    }

    Device.movement(idnfc, idroom, (err, movementData) => {
        if (err) {
            if (err.kind === "not_authorized") {
                res.status(500).send({
                    message: `User is not authorized to enter the room.`
                });
            } else {
                res.status(500).send({
                    message: `Error in authorization checkup.`
                });
            }
        } else {
            Device.lastRoomDirection(movementData.idparticipant, idroom, (err, direction) => {
                if(err) {
                    res.status(500).send({
                        message: `Error while finding last user direction`
                    })
                } else {
                    newDirection = Number(!direction) //opposite direction
                    movementData.direction = newDirection
                    mqttConn.newMovement(movementData)
                    res.send(movementData)

                    Device.addMovement(movementData.idparticipant, movementData.idlesson, idroom, newDirection, (err, result) => {
                        return
                    });
                }
            })
            
        };
    });

};

// SELECT
//     event_lessons.name AS lesson_name,
//     event_lessons.time_start AS time_start,
//     event_lessons.time_finish AS time_finish,
//     event_lessons.is_break AS is_break,
//     students.full_name AS student_name,
//     rooms.name AS room_name
// FROM event_templates, event_lessons, events, participants, nfc_tags, students, rooms
// WHERE
//     codnfc = idnfc
//     AND participants.codstudent = idstudent
//     AND participants.codevent = idevent
//     AND events.codtemplate = idtemplate
//     AND event_lessons.codtemplate = idtemplate
//     AND event_lessons.codroom = idroom

//     AND event_lessons.codroom = 2
//     AND nfc_tags.idnfc = 1
//     AND events.day = CURRENT_DATE()
//     AND CURRENT_TIME() > event_lessons.time_start AND CURRENT_TIME() < event_lessons.time_finish
