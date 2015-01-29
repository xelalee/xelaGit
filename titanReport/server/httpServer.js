var E = {};

E.http  = require('http');
E.https = require('https');
E.path  = require('path');
E.fs    = require('fs');

//these are the only file types we will support for now
E.extensions = {
    ".html" : "text/html",
    ".css" : "text/css",
    ".js" : "application/javascript",
    ".png" : "image/png",
    ".gif" : "image/gif",
    ".jpg" : "image/jpeg",
    ".json" : "application/json",
    ".tmpl" : "text/html"
};

// http service begin
//helper function handles file verification
E.getFile = function (filePath,res,page404,mimeType) {
    //does the requested file exist?
    E.fs.exists(filePath,function(exists){
        //if it does...
        if(exists){
            //read the fiule, run the anonymous function
            E.fs.readFile(filePath,function(err,contents){
                if(!err){
                    //if there was no error
                    //send the contents with the default 200/ok header
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        } else {
            //if the requested file was not found
            //serve-up our custom 404 page
            E.fs.readFile(page404,function(err,contents){
                //if there was no error
                if(!err){
                    //send the contents with a 404/not found header 
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    //for our own troubleshooting
                    console.dir(err);
                };
            });
        };
    });
};

//a helper function to handle HTTP requests
E.requestHandler = function (req, res) {
    var fileName = E.path.basename(req.url) || 'index.html',
    ext          = E.path.extname(fileName),
    //localFolder  = __dirname + '/', 
    clientFolder = './client/',
    jsonFolder   = clientFolder + 'json/',
    jsFolder     = clientFolder + 'js/',
    tmplFolder   = clientFolder + 'tmpl/',
    cssFolder    = clientFolder + 'css/',
    imgFolder    = cssFolder + 'images/',
    page404      = clientFolder + '404.html';

    //do we support the requested file type?
    if(!E.extensions[ext]){
        //for now just send a 404 and a short message
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;The requested file type is not supported&lt;/body&gt;&lt;/html&gt;");
    };

    //call our helper function
    //pass in the path to the file we want,
    //the response object, and the 404 page path
    //in case the requestd file is not found

    switch( ext )
    {
    case '.jpg':
    case '.png':
    case '.gif':
        E.getFile((imgFolder + fileName),res,page404,E.extensions[ext]);
        break;
    case '.css':
        E.getFile((cssFolder + fileName),res,page404,E.extensions[ext]);
        break;
    case '.js':
        E.getFile((jsFolder + fileName),res,page404,E.extensions[ext]);
        break;
    case '.json':
        E.getFile((jsonFolder + fileName),res,page404,E.extensions[ext]);
        break;
    case '.tmpl':
        E.getFile((tmplFolder + fileName),res,page404,E.extensions[ext]);
        break;
    default: 
        E.getFile((clientFolder + fileName),res,page404,E.extensions[ext]);
    }
};
// http service end

module.exports = E;

