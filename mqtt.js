var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

client.on('connect', function () {
  console.log('connected');
  // client.subscribe('presence');
  // client.publish('presence', 'Hello mqtt');
});

client.on('reconnect', function () {
  console.log('reconnected');
  // client.subscribe('presence');
  // client.publish('presence', 'Hello mqtt');
});

module.exports = {
    publish: function(topic, message) {
      console.log("Published message: '" + message + "' on topic:'" + topic + "'")
      client.publish(topic, message);
    }
}
