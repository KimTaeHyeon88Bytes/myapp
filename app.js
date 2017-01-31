var express = require("express");

var app = express();

/*app.get("/", function(req, res) {
  res.send("Hello World!");
});*/

//var port = process.enc.PORT || 8000;

app.listen(8000, function() {
  console.log("server on!");
});

app.use(express.static(__dirname + "/public"));
