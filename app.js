var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = module.exports = express();

app.use(bodyParser.json());


var originalLink;
app.get("/:link",function(req,res){
    originalLink = path.join(__dirname, req.params.link);
    var shortenLink  = path.join(__dirname,"1");

    res.json({
        "original": originalLink.toString(),
        "shorten": shortenLink.toString(),
    });
})


app.get(path.join(__dirname,"1"),function(req,res){
    res.redirect(originalLink);
})

app.listen(3000, function(){
    console.log("Working");
})