var path = require("path");
var fs = require('fs');


exports.addEndpoints = function(connect, options, middlewares){

    middlewares.unshift(linksSave);
    middlewares.unshift(characterSave);

    return middlewares;
};

function characterSave(req, res, next){
    if (req.url !== '/server/characters') return next();

    console.log("characters: " + req.method);
    var postData = '';
    req.on('data', function(data){
        postData += data;
    });
    req.on('end', function() {
        var resultObject = JSON.parse(postData);

//        console.log("dirname: " + __dirname);
        // fs.exists(__dirname + "/../app/data/got/nodes.json", function(exists){
        //     console.log("Exists: " + exists);
        // });
        fs.writeFile(__dirname + '/../app/data/got/nodes.json', postData, function(err){
            if (err){
                console.log("Error posting character data: " + err);
            }
            else {
                console.log("Posting character data success");
            }
        });

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end();
      
    });
}

function linksSave(req, res, next){
    if (req.url !== '/server/links') return next();

    console.log("links: " + req.method);

    var postData = '';
    req.on('data', function(data){
        postData += data;
    });
    req.on('end', function() {
        var resultObject = JSON.parse(postData);
        fs.writeFile(__dirname + '/../app/data/got/links.json', postData, function(err){
            if (err){
                console.log("Error posting links data: " + err);
            }
            else {
                console.log("Posting links data success");
            }
        });

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end();
      
    });

}