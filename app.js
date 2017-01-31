var express = require("express");
var http = require("http");
var fs = require("fs");

var app = express();

/*app.get("/", function(req, res) {
  res.send("Hello World!");
});*/

var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log("server on!");
});

app.use(express.static(__dirname + "/public"));
