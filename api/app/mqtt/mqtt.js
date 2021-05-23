const mqtt = require('mqtt')

class Mqtt {
    constructor(host, username, password) {
        this.connection = mqtt.connect(host, {
                username: username,
                password: password
            }); 
        this.connection.on('connect', () => this.onConnect())
    }

    onConnect() {
        console.log("Successfully connected to MQTT Broker");
    }
    
    newMovement(data) {
        const jsonData = JSON.stringify(data)
        this.connection.publish("movements", jsonData);
    }
}

module.exports = Mqtt;
