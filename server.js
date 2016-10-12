var request = require('request');
var express = require('express');
var fs = require('fs');

var port = 3000;

function start_server(){
  var app = express();
  app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || port));
  app.use(express.static(__dirname + '/public'));
  //Запуск сервера
  app.listen(app.get('port'),function(){
      console.log('Server run on port: ' + port);
  });
  //Главная страница
  app.get('/', function(req, res) {
      var file = fs.readFileSync('./views/home.html').toString();
      res.end(file);
  });
}

module.exports = {
  start_server : start_server
}
