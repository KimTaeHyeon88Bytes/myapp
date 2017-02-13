var express = require("express");
var app = express();
var http = require("http").Server(app);
var fs = require("fs");
var mongoose = require("mongoose");

/*app.get("/", function(req, res) {
  res.send("Hello World!");
});*/

mongoose.connect("mongodb://kimth6617:88Bytes!@ds151279.mlab.com:51279/myapp");
var db = mongoose.connection;

db.once("open", function() {
  console.log("DB connected!");
});
db.on("error", function(err) {
  cosole.log("DB error : ", err);
});

var port = process.env.PORT || 8000;

http.listen(port, function() {
  console.log("server on!");
});

app.set("view engine", "ejs");
//app.use(express.static(__dirname + "/public"));

var data = {
  count : 0
};

app.get("/", function(req, res) {
  data.count++;
  //console.log(data.count);
  res.render("MyFirstEjs.ejs", data);
});

app.get("/reset", function(req, res){
  data.count = 0;
  res.render("MyFirstEjs.ejs", data);
});

app.get("/set/count", function(req, res){
  if(req.query.count) {
    data.count = req.query.count;
  }
  res.render("MyFirstEjs.ejs", data);
});

app.get("/set/:num", function(req, res) {
  data.count = req.params.num;
  res.render("MyFirstEjs.ejs", data);
});
