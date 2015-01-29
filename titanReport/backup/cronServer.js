var E      = {},
    fs     = require('fs'),
    https  = require('https'),
    node7z = require('node-7z');

E.cron = require('cron');
E.rand = {};
E.job  = {};
E.reg  = /^[0-5][0-9]$/;

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

E.jobs = function( serial, ip ) {
    var setCron = function( digit ) {
        if ( E.reg.test( digit ) ) {
            E.job[ serial ] = new E.cron.CronJob({
                cronTime: digit + ' * * * * *',
                onTick: function() {
                    console.log( 'https://' + ip + '/tsr/' + serial + '_TSR.7z' );
                    https.request(
                        {
                            hostname : ip,
                            port: 443,
                            path: '/tsr/',
                            method: 'GET',
                            headers: {
                                'Content-Type' : 'application/x-7z-compressed'
                            },
                            strictSSL: false,
                            rejectUnauthorized: false,
                            agent: false
                        },
                        data = [],
                        dataLen = 0,
                        function( res ) {
                            //console.log( 'statusCode: ', res.statusCode );
                            //console.log( 'headers: ', res.headers );
                            res.on( 'data', function( d ) {
                                //process.stdout.write( d );
                                data.push( d );
                                dataLen += chunk.length;
                            }).on( 'end', function() {
                                var buff = new Buffer( dataLen );
                                for (var i=0, len=data.length, pos=0; i<len; i++)
                                {
                                    data[ i ].copy( buff, pos );
                                    pos += data[ i ].length;
                                }
                            });
                        }
                    ).on('error', function( e ) {
                        console.error( e );
                    });
                },
                start: true
            });
        } else 
            console.log( serial + ' @ cron failed ' );
    }

    setCron( E.rands( serial ) );
}

module.exports = E;
