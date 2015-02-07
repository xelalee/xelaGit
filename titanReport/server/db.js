var E = {};

E.mysql = require('mysql');
E.conf  = require( __dirname + '/json/config.json');
E.db    = require( __dirname + '/json/db.json');
E.reg   = /"/;
E.regDU = /Devices|Users/;

E.conn = function( type, param, data, callback ) {
    var db,
        con,
        sql,
        date,
        json,
        query,
        table;

    // get today
    date = new Date().toISOString().split("T")[ 0 ].replace(/-/g, '_');
    switch( type )
    {
    case 'install':
        con = E.mysql.createConnection({
            host: E.conf.dbServer,
            port: E.conf.dbPort,
            user: E.conf.dbRoot,
            password: E.conf.dbPass
        });

        con.connect();

        // create & grant user for titan report database
        sql = "CREATE USER '" + E.conf.dbUser + "'@'" + E.conf.dbServer + "' IDENTIFIED BY '" + E.conf.dbUPass + "'; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
        });

        sql = "GRANT USAGE ON * . * TO '" + E.conf.dbUser + "'@'" + E.conf.dbServer + "' IDENTIFIED BY '" + E.conf.dbUPass + "'; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
        });

        // create titan report database
        sql = "CREATE DATABASE IF NOT EXISTS `" + E.conf.dbName + "`; " ;
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
        });

        sql = "GRANT ALL PRIVILEGES ON `" + E.conf.dbName + "` . * TO '" + E.conf.dbUser + "'@'" + E.conf.dbServer + "'; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
        });

        sql = "USE " + E.conf.dbName + "; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
        });
        // create titan report table
        for (var x in E.db[ type ]) 
        {
            sql = "CREATE TABLE IF NOT EXISTS `" + x + "` (";
            for (var y in E.db[ type ][ x ].col)
                sql += "`" + y + "` " + E.db[ type ][ x ].col[ y ] + ",";
            sql += E.db[ type ][ x ].key + ");";
            con.query( sql, function( err, rows, fields ) {
                if (err)
                    throw err;
            });
        }

        con.end();
        break;
    case 'daily':
        // create today's database
        con = E.mysql.createConnection({
            host: E.conf.dbServer,
            port: E.conf.dbPort,
            user: E.conf.dbRoot,
            password: E.conf.dbPass
        });

        con.connect();
        db = E.conf.dbName + '_' + date;

        // create titan report database
        sql = "CREATE DATABASE IF NOT EXISTS `" + db + "`; " ;
        con.query( sql, function( err, rows, fields ) {
            if (err)
                console.info( err );
        });

        sql = "GRANT ALL PRIVILEGES ON `" + db + "` . * TO '" + E.conf.dbUser + "'@'" + E.conf.dbServer + "'; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                console.info( err );
        });

        con.end();

        E.conn('create');
        break;
    case 'check':
        con = E.mysql.createConnection({
            host: E.conf.dbServer,
            port: E.conf.dbPort,
            user: E.conf.dbUser,
            password: E.conf.dbUPass
        });

        db = E.conf.dbName + '_' + date;

        con.connect();
        sql = 'SELECT count(*) as cnt FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "' + db + '";';
        con.query( sql, function( err, rows, fields ) {
            if ( err )
                console.log( err );
            else if (0 === rows[ 0 ].cnt)
                E.conn('daily');
        });
        con.end();
        break;
    case 'create':
        // create table
        db = E.conf.dbName + '_' + date;
        con = E.mysql.createConnection({
            host: E.conf.dbServer,
            port: E.conf.dbPort,
            user: E.conf.dbUser,
            password: E.conf.dbUPass,
            database: db
        });

        con.connect();

        if (param) {
            // create daily titan report table of serial
            for (var x in E.db[ type ])
            {
                sql = "CREATE TABLE IF NOT EXISTS `" + x + "_" + param + "` (";
                for (var y in E.db[ type ][ x ].col)
                    sql += "`" + y + "` " + E.db[ type ][ x ].col[ y ] + ",";
                sql += E.db[ type ][ x ].key + ");";
                con.query( sql, function( err, rows ) {
                    if (err)
                        console.info( err );
                });
            }
        } else {
            // get devices' serial
            sql = 'SELECT serial FROM ' + E.conf.dbName + '.`Devices` WHERE remark = "Y"';

            con.query( sql, function( err, rows ) {
                if (err)
                    console.info( err );
                else {
                    // create daily titan report table of serial
                    for (var i=0, len=rows.length; i<len; i++)
                    {
                        for (var x in E.db[ type ])
                        {
                            sql = "CREATE TABLE IF NOT EXISTS `" + x + "_" + rows[ i ].serial + "` (";
                            for (var y in E.db[ type ][ x ].col)
                                sql += "`" + y + "` " + E.db[ type ][ x ].col[ y ] + ",";
                            sql += E.db[ type ][ x ].key + ");";
                            con.query( sql, function( err, rows ) {
                                if (err)
                                    console.info( err );
                            });
                        }
                    }
                }
            });
        }
        
        con.end();
        break;
    case 'insert':
        // insert data
        if (E.regDU.test( param )) 
            db = E.conf.dbName;
        else
            db = E.conf.dbName + '_' + date;
        con = E.mysql.createConnection({
            host: E.conf.dbServer,
            port: E.conf.dbPort,
            user: E.conf.dbUser,
            password: E.conf.dbUPass,
            database: db
        });

        if ( data ) {
            con.connect();
            sql = '';
            if (E.regDU.test( param )) {
                var arrR = [];
                var arrV = [];
                
                for (var x in data)
                {
                    arrR.push( x );
                    arrV.push( data[ x ] );
                }
                sql = 'INSERT INTO `' + param + '` (' + arrR.join(',') + ') VALUES (' + arrV.join(',') + ');';
                con.query( sql, function( err, rows ) {
                    if (err)
                        console.info( err );
                });
            } else {
                for (var i=0, len=data.length; i<len; i++)
                {
                    // row data
                    var arrJ = data[ i ].split(';');
                    var arrR = [ 'sno' ];
                    var arrV = [ 0 ];
                    for (var j=0, jlen=arrJ.length; j<jlen; j++)
                    {
                        var arrK = arrJ[ j ].split('=');
                        arrR.push( arrK[ 0 ] );
                        if (E.reg.test( arrK[ 1 ] ))
                            arrV.push( arrK[ 1 ] );
                        else
                            arrV.push( '"' + arrK[ 1 ] + '"' );
                    }
                    sql = 'INSERT INTO `' + param + '` (' + arrR.join(',') + ') VALUES (' + arrV.join(',') + ');';
                    console.log( sql );
                    con.query( { sql: sql, timeout: 10000 }, function( err, rows ) {
                        if (err)
                            console.log( err );
                    });
                }
            }
            con.end();
        }
        break;
    case 'query':
        // query database
        if (E.regDU.test( param )) 
            db = E.conf.dbName;
        else
            db = E.conf.dbName + '_' + date;

        con = E.mysql.createConnection({
            host: E.conf.dbServer,
            port: E.conf.dbPort,
            user: E.conf.dbUser,
            password: E.conf.dbUPass,
            database: db
        });

        sql = data;

        con.connect();
        con.query( sql, function( err, rows ) {
            if (err)
                console.info( err, null );
            else
                callback( null, json );
            console.info( rows );
        });
        con.end();
        break;
    }
};

module.exports = E;
