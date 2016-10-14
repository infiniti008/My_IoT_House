var mosca = require('mosca');

var pubsubsettings = {
  type: 'mqtt',
  json: false,
  mqtt: require('mqtt'),
  host: '192.168.1.231',
  port: 8883
};

var moscaSettings = {
  port: 1883,           //mosca (mqtt) port
  backend: pubsubsettings   //pubsubsettings is the object we created above
};

var message = {
  topic: '/hello/world',
  payload: 'abcde', // or a Buffer
  qos: 0, // 0, 1, or 2
  retain: false // or true
};

function srart_mosca(){
  var server = new mosca.Server(moscaSettings);   //here we start mosca
  server.on('ready', setup);  //on init it fires up setup()

  server.publish(message, function() {
    console.log('done!');
  });
}
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}

module.exports = {
  srart_mosca : srart_mosca
}
