var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = module.exports = express();

app.use(bodyParser.json());


var link;

var originalLink;

app.get("/:link",function(req,res){
    link = req.params.link;
    originalLink = req.protocol + "s://" + req.get("host") + "/" + link;
    var shortenLink  = req.protocol + "s://" + req.get("host") + "/" + "1/1";

    res.json({
        "original": originalLink.toString(),
        "shorten": shortenLink.toString(),
    });
})


app.get("/1/1",function(req,res,next){
    console.log("redirect working");     
    if(req.headers['x-forwarded-proto']!='https')
        res.redirect("https://" + link)
    else
        next()
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Working");
})