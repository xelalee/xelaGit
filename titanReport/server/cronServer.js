/**
 * cron jobs
 * rands : set random 0 ~ 59 sec for 5min cron start, avoid 1 time if the same value
 * crons : set cronJob by type,
 *     type: daily for create daily database
 *           min for get 7z from device
 *
**/
var E   = {};

E.fs    = require('fs');
E.db    = require('./db.js');
E.cron  = require('cron');
E.exec  = require('child_process').exec;
E.spawn = require('child_process').spawn;
E.curl  = require('node-curl');

E.rand  = {};
E.reg   = /^[0-5][0-9]$/;
E.cronM = {};

E.chomp = function( data ) {
    return data.replace(/(\n|\r)+$/, '');
}

E.rands = function( serial ) {
    var setRands = function( flag ) {
        var ten = getRands( 0, 5 ),
            one = getRands( 0, 9 ),
            digit = ten.toString() + one.toString();
        if (E.rand[ serial ] && !flag)
            return setRands( true );
        else {
            E.rand[ serial ] = digit;
            return digit;
        }
    },
    getRands = function( low, high ) {
        return Math.floor( Math.random() * ( high - low + 1 ) + low );
    };

    return setRands( false );
}

E.dbs = function( serial ) {
    // deal with data
    for (var x in E.db.db.create) 
    {
        var file = './server/tmp/' + serial + '_' + x;
        if (E.fs.existsSync( file )) {
            var buf = E.chomp( E.fs.readFileSync( file, "utf8" ) );
            if (buf.length > 0) {
                var arrI = buf.split('\n');
                E.db.conn( 'insert', x, arrI );
            }
        }
    }
}

E.crons = function( type, serial, ip ) {
    switch( type )
    {
    case 'daily':
        E.cronD = new E.cron.CronJob({
            cronTime: '0 0 0 * * *',
            onTick: function() {
                // create daily database
                E.db.conn('create');
            },
            start: true
        });
        break;
    case 'min':
        E.cronM[ serial ] = new E.cron.CronJob({
            cronTime: E.rands( serial ) + ' * * * * *',
            onTick: function() {
                // check if database exists
                E.db.conn('check');
                // get device 7z to insert
                var file_url = ip + '/tsr/' + serial + '_TSR.zip', //7z',
                    file_name = serial + '_TSR.zip', //7z',
                    file_path = __dirname + '/tmp/' + file_name,
                    file = E.fs.createWriteStream( file_path ),
                    curl = E.spawn('curl', [file_url]);

                console.info( 'get ' + file_name + ' @ ' + ip + ' @ ' + E.rand[ serial ] );
                file.on('finish', function() {
                    console.info( serial );
                    //console.log( 'unar -p "' + E.db.conf.zipPass + '" -D -f -o ' + __dirname + '/tmp/ ' + __dirname + '/tmp/' + serial + '_TSR.7z' );
                    
                    console.log( 'unzip -o -P "' + E.db.conf.zipPass + '" -d ' + __dirname + '/tmp/ ' + __dirname + '/tmp/' + serial + '_TSR.zip' );
                    
                    E.child = E.exec( 'unzip -o -P "' + E.db.conf.zipPass + '" -d ' + __dirname + '/tmp/ ' + __dirname + '/tmp/' + serial + '_TSR.zip', function( err, stdout, stderr ) {
                        if ( err !== null )
                            console.info( err );
                        else 
                            E.dbs( serial );
                    });
                });

                curl.stdout.on('data', function( data ) {
                    file.write( data );
                });

                curl.stdout.on('end', function() {
                    file.end();
                });

                curl.on('close', function( code ) {
                    console.info( code );
                });


/*
                E.curl( file_url, function( err ) {
                    console.log( this.status );
                    if ( 200 === parseInt( this.status ) ) {
                        //console.info( this.header );
                        file.write( this.body );
                        file.end();
                    } else {
                        // 404 or somewhat happened, restart with new rand
                        E.cronM[ serial ].stop();
                        delete E.rand[ serial ];
                        E.crons('min', serial, ip );
                    }
                });
*/

            },
            start: true
        });
        break;
    }
}

module.exports = E;
