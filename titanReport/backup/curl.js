var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var file_url = '192.168.99.199/tsr/bb00000000_TSR.7z';
//var file_url = '192.168.99.199/index.html';
var file_name = url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream('./' + file_name);
var curl = spawn('curl', [file_url]);

curl.stdout.on('data', function(data) { file.write(data); });

curl.stdout.on('end', function(data) {
    file.end();
});

//curl.on('exit', function(code) {
//    if (code != 0) {
//        console.log('Failed: ' + code);
//    }
//});
