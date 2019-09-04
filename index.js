//jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {


  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  var finalUrl = url + crypto + fiat;

  request(finalUrl, function(error, response, body) {

 var data = JSON.parse(body);
 var price = data.averages.week;
  var currentDate = data.display_timestamp;

res.write("<p>The curent date is : " + currentDate + "</p>");
res.write("<h1>The average price of " + crypto + " is " + price + fiat + "</h1>" );
 res.send();

  });

});


app.listen(3000, function() {

  console.log("Your site is working on port 3000: ");

});
