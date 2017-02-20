var express = require("express");
var app = express();
var http = require("http").Server(app);
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

var dataSchema = mongoose.Schema({
  name:String,
  count:Number,
  msg:String
});
var Data = mongoose.model("data", dataSchema);
Data.findOne({name:"myData"}, function(err, data) {
  if(err) {
    return console.log("Data ERROR", err);
  }
  if(!data) {
    Data.create({
      name:"myData",
      count:0,
      msg:"힣"
    }, function(err, data) {
      if(err) {
        return console.log("Data ERROR", err);
      }
      console.log("Counter initialized : ", data);
    });
  }
});

var port = process.env.PORT || 8000;

http.listen(port, function() {
  console.log("server on!");
});

app.set("view engine", "ejs");
//app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  Data.findOne({name:"myData"}, function(err, data) {
    if(err) return console.log("Data ERROR", err);
    data.count++;
    data.save(function(err) {
      if(err) return cosole.log("Data ERROR", err);
  //console.log(data.count);
  res.render("MyFirstEjs.ejs", data);
    });
  });
});

app.get("/reset", function(req, res){
  Data.findOne({name:"myData"}, function(err, data) {
    if(err) return console.log("Data ERROR", err);
    data.count = 0;
    data.save(function(err) {
      if(err) return cosole.log("Data ERROR", err);
  res.render("MyFirstEjs.ejs", data);
    });
  });
});

app.get("/set/count", function(req, res){
  Data.findOne({name:"myData"}, function(err, data) {
    if(err) return console.log("Data ERROR", err);
    if(req.query.count) {
      data.count = req.query.count;
    }
    data.save(function(err) {
      if(err) return cosole.log("Data ERROR", err);
  res.render("MyFirstEjs.ejs", data);
    });
  });
});

app.get("/set/:num", function(req, res) {
  Data.findOne({name:"myData"}, function(err, data) {
    if(err) return console.log("Data ERROR", err);
      data.count = req.params.num;
    data.save(function(err) {
      if(err) return cosole.log("Data ERROR", err);
  res.render("MyFirstEjs.ejs", data);
    });
  });

});
