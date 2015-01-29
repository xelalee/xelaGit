var E = {};

E.mysql = require('mysql');
E.conf  = require( __dirname + '/json/config.json');
E.db    = require( __dirname + '/json/db.json');
E.reg   = /_\d{4}_\d{2}_\d{2}$/;
E.regC  = /"/;
E.flag  = false;

E.conn = function( type, table, data ) {
    var db,
        con,
        sql,
        date,
        regD,
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
            console.log( rows );
        });

        sql = "GRANT USAGE ON * . * TO '" + E.conf.dbUser + "'@'" + E.conf.dbServer + "' IDENTIFIED BY '" + E.conf.dbUPass + "'; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
            console.log( rows );
        });

        // create titan report database
        sql = "CREATE DATABASE IF NOT EXISTS `" + E.conf.dbName + "`; " ;
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
            console.log( rows );
        });

        sql = "GRANT ALL PRIVILEGES ON `" + E.conf.dbName + "` . * TO '" + E.conf.dbUser + "'@'" + E.conf.dbServer + "'; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
            console.log( rows );
        });

        sql = "USE " + E.conf.dbName + "; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
            console.log( rows );
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
                console.log( rows );
            });
        }

        con.end();

        // create first daily database
        E.conn('create');
        break;
    case 'create':
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
                throw err;
            console.log( rows );
        });

        db = E.conf.dbName + '_' + date;

        sql = "GRANT ALL PRIVILEGES ON `" + db + "` . * TO '" + E.conf.dbUser + "'@'" + E.conf.dbServer + "'; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
            console.log( rows );
        });

        sql = "USE " + db + "; ";
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
            console.log( rows );
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
                console.log( rows );
            });
        }
        
        con.end();
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
        sql = 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "' + db + '";';
        con.query( sql, function( err, rows, fields ) {
            if ((1 === rows.length) && (E.reg.test(rows[ 0 ].SCHEMA_NAME)))
                E.flag = true;
        });
        con.end();

        if (!E.flag)
            E.conn('create');
        break;
    case 'insert':
        // insert to today's database
        db = E.conf.dbName + '_' + date;
        con = E.mysql.createConnection({
            host: E.conf.dbServer,
            port: E.conf.dbPort,
            user: E.conf.dbUser,
            password: E.conf.dbUPass,
            database: db
        });

        con.connect();

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
                 if (E.regC.test( arrK[ 1 ] ))
                     arrV.push( arrK[ 1 ] );
                 else
                     arrV.push( '"' + arrK[ 1 ] + '"' );
             }
             sql = 'Insert INTO `' + table + '` (' + arrR.join(',') + ') VALUES (' + arrV.join(',') + ');';
             console.log( sql );
         }
        /*
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
            console.log( rows );
        });
        */

        con.end();
        break;
    case 'query':
        // query database
        db = E.conf.dbName + '_' + date;
        con = E.mysql.createConnection({
            host: E.conf.dbServer,
            port: E.conf.dbPort,
            user: E.conf.dbUser,
            password: E.conf.dbUPass,
            database: db
        });

/*
        con.connect();
        con.query( sql, function( err, rows, fields ) {
            if (err)
                throw err;
            console.log( rows );
        });
        con.end();
*/
        break;
    }

};

module.exports = E;
