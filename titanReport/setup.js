/**
 *  report server setup
 *  database : create titanReport
 *  tables   : create relative tables
 *  daily    : create daily database & tables
**/

// step1 ) create database
var db   = require( __dirname + '/server/db.js');

db.conn('install');

