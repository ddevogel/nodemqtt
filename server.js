var http = require('http');
var mqtt = require('mqtt');
var express = require('express');
var bodyParser = require('body-parser');

const IP_WEB = '10.22.88.116';
const IP_MQTT = '10.22.88.116';
const PORT_WEB = 8080;
const PORT_MQTT = 8000;

var client  = mqtt.connect('mqtt://' + IP_MQTT);
var app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

client.on('connect', function () {
  console.log('connected to mqtt');
});

var server = app.listen(PORT_WEB, IP_WEB, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.post("/", function(req, res) {
  var payload = req.body;
  console.log(payload.topic);
  console.log(JSON.stringify(payload.message));
  client.publish(payload.topic.toLowerCase(), JSON.stringify(payload.message));
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Got Post Data');
});

app.get("/endpoint", function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('{"host": "' + IP_MQTT + '", "port": ' + PORT_MQTT + '}');
});
