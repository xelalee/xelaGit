var db   = require('./server/db.js');

db.conn('query', 'Devices', 'select count(*) from Devices', function( err, result ) {
    console.info( err );
    console.info( result );
});
