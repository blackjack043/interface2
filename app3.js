const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = express.json();

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended:true});
var cors = require('cors');
app.use(cors());
//app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));


const fs = require("fs");


function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
};

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
};

//assume that config.json is in application root


  
app.get("/data", function(request, response){
  //  response.sendfile(__dirname + '/index2.html');
  //response.json(__dirname +'/data.json');
  var json = getConfig('data.json');
  response.header("Content-Type",'application/json');
  response.json(json);
//	response.sendFile(__dirname +'/data.json');
});

app.get("/names", function(request, response){
  //  response.sendfile(__dirname + '/index2.html');
	response.sendFile(__dirname +'/names.json');
});


app.listen(3000);