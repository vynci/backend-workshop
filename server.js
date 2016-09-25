var express = require('express');
var app = express();
var cors = require('cors');
var mqtt = require('mqtt');
var env = process.env.NODE_ENV || 'development';
var port = Number(process.env.PORT || 3000);

var client  = mqtt.connect({
  host : '188.166.184.34',
  port : 6969,
  username : 'pipeeroac05c207b',
  password : '5738921e589fcb114312db62'
})

client.on('connect', function () {
  client.subscribe('presence');
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/thing/:thingType/:command', function(req, res) {

  console.log(req.params.command);

  if(req.params.thingType === 'light'){
    client.publish('pub/57dfbbabf0c93b5449d4638a/57e411f674421a03006901a0', req.params.command);
  }else{
    client.publish('pub/57dfbbabf0c93b5449d4638a/57e411eb74421a030069019e', req.params.command);
  }

  res.send('success');
});

var server = app.listen(port, function() {
  console.log("Express server listening on port %d", server.address().port);
});
