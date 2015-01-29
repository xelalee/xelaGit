// get config
var conf  = require( './server/json/config.json');

// http service up
var httpS = require( './server/httpServer.js');
httpS.http.createServer(httpS.requestHandler).listen( conf.http );
console.log('Server running @ http://127.0.0.1:' + conf.http + '/');

// cron service up
var cronS = require( './server/cronServer.js');
// xela's
cronS.crons( 'min', 'bb00000000', '192.168.99.199' );
// art's
cronS.crons( 'min', '1411902710', '192.168.13.10' );
