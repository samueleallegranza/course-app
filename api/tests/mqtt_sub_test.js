const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

const topicToSub = 'movements'

client.on('connect', () => {
    console.log("connected!")
    client.subscribe(topicToSub)
})

client.on('message', (topic, message) => {
  if (topic === topicToSub) {
    console.log(message.toString());
  }
})