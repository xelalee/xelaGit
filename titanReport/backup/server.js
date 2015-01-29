var conf  = require('./server/json/config.json');

var httpS = require('./server/httpServer.js');
httpS.http.createServer(httpS.requestHandler).listen(8080);
console.log('Server running @ http://127.0.0.1:8080/');

var cronS = require('./server/cronServer.js');
cronS.jobs( 'bb00000000', '192.168.99.199' );

// console.log( conf );

