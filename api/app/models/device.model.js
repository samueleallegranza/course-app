const sql = require("./db.js");

// constructor
const Device = function (device) {
    this.iddevice = device.iddevice;
    this.name = device.name;
    this.pwd_hash = device.pwd_hash;
    this.codroom = device.codroom;
};

Device.auth = (username, password, result) => {
    sql.query(`SELECT codroom FROM devices WHERE username='${username}' AND pwd_hash='${password}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length < 1) {
            // not found device with given credentials
            result({ kind: "auth_error" }, null);
            return;
        }

        console.log(`authenticated device '${username}': `, res);
        result(null, res[0]);
    });
};

Device.movement = (idnfc, idroom, result) => {
    query = `
    SELECT
        event_lessons.name AS lesson_name,
        event_lessons.idlesson AS idlesson,
        event_lessons.time_start AS time_start,
        event_lessons.time_finish AS time_finish,
        event_lessons.is_break AS is_break,
        students.full_name AS student_name,
        participants.idparticipant AS idparticipant,
        rooms.name AS room_name,
        rooms.idroom AS idroom,
        rooms.codroomtype AS idroomtype
    FROM event_templates, event_lessons, events, participants, nfc_tags, students, rooms
    WHERE
        codnfc = idnfc
        AND participants.codstudent = idstudent
        AND participants.codevent = idevent
        AND events.codtemplate = idtemplate
        AND event_lessons.codtemplate = idtemplate
        AND event_lessons.codroom = idroom

        AND event_lessons.codroom = ${idroom}
        AND nfc_tags.idnfc = ${idnfc}
        AND events.day = CURRENT_DATE()
        AND CURRENT_TIME() > event_lessons.time_start AND CURRENT_TIME() < event_lessons.time_finish
    `;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length != 1) {
            // Something is wrong. There are multiple possibilities:
            // - Specific room has no event at the moment.
            // - Nfc card is not linked with a participant.
            // - Other stuff...
            // - [!] User is joining in a service room
            sql.query(`
                SELECT
                    students.full_name AS student_name,
                    participants.idparticipant AS idparticipant,
                    rooms.name AS room_name,
                    rooms.idroom AS idroom,
                    rooms.codroomtype AS idroomtype
                FROM nfc_tags, participants, students, rooms
                WHERE
                    codnfc = idnfc
                    AND participants.codstudent = idstudent

                    AND codroomtype = 2
                    AND idroom = ${idroom}
                    AND idnfc = ${idnfc}
                `, (err, res) => {
                    if(err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;            
                    }
                    if(res.length != 1) {
                        // User is not authorized to enter the room.
                        result({ kind: "not_authorized" }, null);
                        return;
                    } else {
                        // Query returned one exact line, which corresponds the service room (unlimited access)
                        console.log(`user entered a room: '`, res[0]);
                        result(null, res[0]);
                    }
            })
        } else {
            // Query returned one exact line, which corresponds to the ongoing event of the room.
            console.log(`user entered a room: '`, res[0]);
            result(null, res[0]);
        }
    });
};


Device.addMovement = (idparticipant, idlesson, idroom, direction, result) => {
    if(!idlesson) {
        idlesson = 'NULL'
    }
    console.log("trying to add")
    const query = `
        INSERT INTO participant_movements (codparticipant, codlesson, codroom, direction, time)
        VALUES (${idparticipant}, ${idlesson}, ${idroom}, ${direction}, CURRENT_TIME())
    `;
    sql.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("added movement to database ", res)
        result(null, res);
    });
};

Device.lastRoomDirection = (idparticipant, idroom, result) => {
    // Pay attention! There is a distinction between service room movements and lesson movements
    // It's a must to first detect whether the movement is related to a service or a meeting room
    // - If `codlesson` is not null, then it's a meeting room movement
    // - If `codlesson` is null, then it's a service room movement
    
    const query = `
        SELECT direction FROM participant_movements 
        WHERE
            participant_movements.codparticipant=${idparticipant}
            AND participant_movements.codroom=${idroom}
            ORDER BY participant_movements.time DESC
            LIMIT 1
    `;

    sql.query(query, (err, res) => {
        let direction;

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length == 0) {
            // Participant has never been in this room
            // Last direction can be interpreted as 'has left' (in value: 0)
            direction = 0
        } else {
            direction = Number(res[0]["direction"]);
        }

        console.log(`last direction of participant ${idparticipant} in room ${idroom}: `, direction)
        result(null, direction);
    });

}

module.exports = Device