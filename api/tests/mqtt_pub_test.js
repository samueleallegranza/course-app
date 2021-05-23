const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883',
    {
        username: "api",
        password: "api"
    }
)

client.on('connect', () => {
    console.log("connected!")
    client.publish('test', 'test message')
})