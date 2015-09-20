var http = require('http');
//var fs = require('fs');
//var url = require('url');
//var dispatcher = require('httpdispatcher');
var mqtt = require('mqtt');
var express = require('express');
//var connect = require('connect')
var bodyParser = require('body-parser');
const IP_WEB = '10.22.88.116';
const IP_MQTT = '10.22.88.116';
const PORT_WEB = 8080;
const PORT_MQTT = 8000;
var client  = mqtt.connect('mqtt://' + IP_MQTT);



var app = express();

app.use(express.static('static'));
//app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));


client.on('connect', function () {
  console.log('connected to mqtt');
});

var server = app.listen(PORT_WEB, IP_WEB, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// app.get('/', function(req, res){
//     res.send('index.html');
// });

app.post("/", function(req, res) {

  var payload = req.body;
//console.log(JSON.parse(payload.message));
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


/*


dispatcher.setStaticDirname(__dirname);
dispatcher.setStatic('static');

function handleRequest(request, response){
    try {
        //console.log(request)
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
        response.end('err');
    }
}

var server = http.createServer(handleRequest);

server.listen(PORT_WEB, IP_WEB, function(){
    console.log("Server listening on: http://%s:%s", IP_WEB, PORT_WEB);
    // fs.readFile('./index.html', function (err, html) {
    //   if (err) {
    //       throw err;
    //   }
    //   home = html;
    // });
});


dispatcher.onGet("/", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./index.html', 'utf8', function(error, content) {
  		if (error) {
  			res.writeHead(500);
  			res.end();
  		}
  		else {
  			//res.writeHead(200, { 'Content-Type': 'text/html' });
  			res.end(content);
  		}
  	});
});



// app.get("/", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//         fs.readFile('./assets/index.html', 'utf8', function (err,data) {
//             res.end(data);
//         });
// });



dispatcher.onGet("/endpoint", function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('{"host": "' + IP_MQTT + '", "port": ' + PORT_WEB + '}');
});

dispatcher.onPost("/", function(req, res) {
  var payload = JSON.parse(req.body);
  mqtt.publish(payload.topic, payload.message);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Got Post Data');
});
*/
