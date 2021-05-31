import mqtt from 'mqtt'

const mqtt_ip = 'ws://168.119.189.237:9001'
const mqtt_topics = ['movements']

const mqttSetup = (mqttConn_state, updatePartPos) => {
    console.log("Trying to connect to MQTT Broker...");
    const mqttConn = mqtt.connect(mqtt_ip);
    
    mqttConn.on('connect', () => {
        console.log("Connected to MQTT Broker!");
        mqtt_topics.forEach((elm, idx) => {
            mqttConn.subscribe(elm);
        })

        mqttConn_state(mqttConn);
    })
    
    mqttConn.on('message', (topic, message) => {
        if (topic === "movements") {
            const mess = JSON.parse(message)
            console.log(`New movement of participant ${mess.student_name} at room ${mess.room_name}. Direction: ${mess.direction}`)
            console.log(mess);
            updatePartPos(mess.idparticipant, mess.idroom, mess.direction)
        }
    })
}    

export default mqttSetup
