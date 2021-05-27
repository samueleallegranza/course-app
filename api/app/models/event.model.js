const sql = require("./db.js");
const util = require('util')

// constructor
const Event = function (event) {
    this.day = event.day;
    this.spots = event.spots;
    this.codtemplate = event.codtemplate;
};

// checks if there's an event currently going on
// returns the id of the ongoing event and its informations
Event.isAnyOngoing = (result) => {
    sql.query(`SELECT idevent, codtemplate, name FROM events, event_templates WHERE day = CURRENT_DATE() AND codtemplate=idtemplate`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ongoing event: ", res);
        if (res.length === 0) {
            result(null, {eventid: null})
        } else {
            result(null, res[0]);
        }

    })
}

// get the list of perticipants of a certain event
Event.getParticipants = (eventId, result) => {
    sql.query(
        `SELECT idparticipant, idstudent, codnfc, username, full_name, email, birth FROM participants,students
        WHERE codevent=${eventId} AND codstudent=idstudent`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`participants of event ${eventId}: `, res);
        result(null, res);
    });
}

// set presence of a participant, specifing the id of the nfc card
Event.setPresence = (idParticipant, idNfc, result) => {
    sql.query(`UPDATE participants SET codnfc=${idNfc} WHERE idparticipant=${idParticipant}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`set presence of participant ${idParticipant} with card ${idNfc}: `, res);
        result(null, res);
    });
}


// Get a screenshot of the participants' positions during an event
// (last movement)
Event.getScreenshot = (idevent, result) => {
    // get participants of an event that have no moves
    sql.query(`
        SELECT idparticipant FROM participants
        LEFT JOIN participant_movements ON codparticipant=idparticipant
        WHERE idmove IS NULL
        AND codevent = ${idevent}
        AND codnfc IS NOT NULL
    `, (err, partWithNoMoves) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        // Take the query result and create a list of ids.
        const partWithNoMoves_list = partWithNoMoves.map((elm, idx) => {
            return elm["idparticipant"]
        })

        sql.query(`
            SELECT
                idmove AS idmove,
                time AS time,
                direction AS direction,
                participant_movements.codparticipant AS idparticipant,
                codlesson AS idlesson,
                codroom AS idroom
            FROM participant_movements
            INNER JOIN
                (
                SELECT MAX(time) as last_time, codparticipant
                FROM participant_movements, participants
                WHERE
                    codparticipant = idparticipant
                    AND codevent = ${idevent}
                GROUP BY codparticipant
                ) SubMax
            ON participant_movements.time = SubMax.last_time
            AND participant_movements.codparticipant = SubMax.codparticipant
        `, (err, eventMoves) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            // add participants with no data to results
            const movesCount = eventMoves.length
            for (let i=0; i<partWithNoMoves_list.length; i++) {
                eventMoves[movesCount+i] = {
                    "idparticipant": partWithNoMoves_list[i],
                    "nodata": true
                }
            }

            console.log(`Screenshot of ${idevent}: `, eventMoves);
            result(null, eventMoves);
        })
    })
}

// Get event list including count of occupied spots
Event.getAll = (result) => {
    sql.query(`
        SELECT idevent, name, day, spots, difficulty, COUNT(codevent) AS occupied_spots, idtemplate
        FROM events
        LEFT JOIN participants ON codevent = idevent,
        event_templates
        WHERE
            CURRENT_DATE() < day
            AND codtemplate=idtemplate
        GROUP BY idevent;    
    `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`list of events: `, res);
        result(null, res);
    });
}


Event.getTracks = (idtemplate, result) => {
    sql.query(`
    SELECT DISTINCT event_tracks.name AS name
    FROM event_lessons, event_tracks
    WHERE
	    codtrack=idtrack
        AND codtemplate=${idtemplate};
    `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res)
    })
}


// Get template schedule, given idtemplate
Event.getSchedule = (idtemplate ,result) => {
    sql.query(`
        SELECT
            idlesson,
            lesson_name,
            time_start,
            time_finish,
            is_break,
            idtrack,
            track_name,
            rooms.name AS room_name,
            teachers.full_name AS teacher_name
        FROM(
            SELECT
                idlesson,
                event_lessons.name AS lesson_name,
                time_start,
                time_finish,
                is_break,
                idtrack,
                event_tracks.name AS track_name,
                codroom,
                codteacher
            FROM event_lessons
            LEFT JOIN event_tracks ON codtrack = idtrack
            WHERE
                codtemplate = ${idtemplate}
        ) AS schedule
        LEFT JOIN rooms ON codroom = idroom
        LEFT JOIN teachers ON codteacher = idteacher
    `, (err, SQL_schedule) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // Get template names and destructure
        Event.getTracks(idtemplate, (err, SQL_trackNames) => {
            
            const trackNames = SQL_trackNames.map((track, idx) => track.name);

            let schedule = []
            let curr_startTime = null
            let curr_rowIdx = -1
            for(let i=0; i<SQL_schedule.length; i++) {
                // Generate a new row if necessary
                if(SQL_schedule[i].time_start != curr_startTime) {
                    curr_rowIdx++;
                    curr_startTime = SQL_schedule[i].time_start;
                    schedule.push({
                        time_start: SQL_schedule[i].time_start,
                        time_finish: SQL_schedule[i].time_finish,
                        is_break: Boolean(SQL_schedule[i].is_break),
                        events: []
                    })
                }

                // push event data into selected event row
                if (! SQL_schedule[i].is_break) {
                    schedule[curr_rowIdx]["events"].push({
                        lesson_name: SQL_schedule[i].lesson_name,
                        idlesson: SQL_schedule[i].idlesson,
                        is_break: SQL_schedule[i].is_break,
                        room_name: SQL_schedule[i].room_name,
                        teacher_name: SQL_schedule[i].teacher_name
                    })
                }
            }

            // Final object passed as response
            const finalSchedule = {
                tracks: trackNames,
                schedule: schedule
            }
            
            console.log(util.inspect(finalSchedule, false, null, true /* enable colors */))
            result(null, finalSchedule);
        })

    });
}

// Check if user is subscribed to an event
Event.isSubscribed = (idevent, username, result) => {
    sql.query(`
        SELECT COUNT(idparticipant) AS count FROM participants, students WHERE codstudent=idstudent AND username='${username}' AND codevent=${idevent}
    `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        const isSub = res[0]["count"] == 0 ? false : true

        result(null, isSub);
    });
}


// Subscibe an user to an event, given the username and event id
Event.subscribe = (idevent, username, result) => {
    sql.query(`
        INSERT INTO participants (codevent, codstudent)
        SELECT ${idevent}, idstudent FROM students WHERE username='${username}'
    `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`student ${username} subscribed to event ${idevent}: `, res);
        result(null, res);
    });
}

// Get list of events which the user is subscribed to
Event.getSubscriptions = (username, result) => {
    sql.query(`
        SELECT idevent, name, day, spots, difficulty, COUNT(codevent) AS occupied_spots, idtemplate
        FROM events
        LEFT JOIN participants ON codevent = idevent,
        event_templates, students
        WHERE
            codtemplate=idtemplate
            AND codstudent=idstudent
            AND username='${username}'
        GROUP BY idevent`
    , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`list of subscriptions: `, res);
        result(null, res);
    });
}

// Delete subscription given username and idevent
Event.delSubscriptions = (idevent, username, result) => {
    sql.query(`
        SELECT idparticipant FROM participants, students
        WHERE codstudent=idstudent
            AND username='${username}'
            AND codevent=${idevent}
    `, (err, part) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        const idparticipant = part[0].idparticipant
        console.log(part)
        sql.query(`
            DELETE FROM participants WHERE idparticipant=${idparticipant}
        `, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log(`deleted participant ${idparticipant}`, res);
            result(null, res);
        })
    });
}



// Get list of lessons of a participant, given username and idevent
const countPartials = (lessons, time_start) => {
    let count = 0;
    lessons.forEach(lesson => {
        if(lesson.time_start == time_start) { count++ }
    });
    return count;
}

Event.getLessonList = (idevent, username, result) => {
    sql.query(`
        SELECT
        DISTINCT idlesson,
            event_lessons.name AS lesson_name,
            teachers.full_name AS teacher_name,
            rooms.name AS room_name,
            event_lessons.time_start AS time_start,
            event_lessons.time_finish AS time_finish
        FROM participant_movements, participants, students, rooms, teachers, event_lessons
        WHERE
            codparticipant = idparticipant
            AND codstudent = idstudent
            AND participant_movements.codroom = idroom
            AND codteacher = idteacher
            AND codlesson = idlesson
            AND username = '${username}'
            AND codevent = ${idevent}
    `, (err, lessons) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        const lessonsWithPartials = lessons.map((lesson, idx) => {
            const partials = countPartials(lessons, lesson.time_start);
            const isPartial = (partials === 1) ? false : true;
            return {...lesson, partial: isPartial}
        })

        result(null, lessonsWithPartials)
    });
}




module.exports = Event;

// {
//     tracks = ["Excel track", "Word track", "PowerPoint track"],
//     schedule = [
//         {
//             time: "8:00 AM - 11:00 AM",
//             is_break: false,
//             events: [{name, room, teacher}, {name, room, teacher}, {name, room, teacher}]
//         },
//         {
//             time: "1:00 AM - 2:00 AM",
//             is_break: true
//         },
//         {
//             time: "5:00 PM - 6:00 PM",
//             is_break: false,
//             events: [{ name, room, teacher }, { name, room, teacher }, { name, room, teacher }]
//         },
//     ]
// }


// SELECT
// DISTINCT idlesson,
//     event_lessons.name AS lesson_name,
//         teachers.full_name,
//         rooms.name,
//         rooms.codroomtype

// FROM participant_movements, participants, students, rooms, teachers, event_lessons
// WHERE
// codparticipant = idparticipant
// AND codstudent = idstudent
// AND participant_movements.codroom = idroom
// AND codteacher = idteacher
// AND codlesson = idlesson

// AND username = "rebecca.geninatti"
// AND codevent = 1



// SELECT
// DISTINCT idlesson,
//     event_lessons.name AS lesson_name,
//     teachers.full_name AS teacher_name,
//     rooms.name AS room_name,
//     event_lessons.time_start AS time_start,
//     event_lessons.time_finish AS time_finish
// FROM participant_movements, participants, students, rooms, teachers, event_lessons
// WHERE
//     codparticipant = idparticipant
//     AND codstudent = idstudent
//     AND participant_movements.codroom = idroom
//     AND codteacher = idteacher
//     AND codlesson = idlesson
//     AND username = "rebecca.geninatti"
//     AND codevent = 1