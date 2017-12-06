

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

var link;

app.get("/o/:link(*)",function(req,res){
    if (req.params.link == "favicon.ico") {
        return;
    } else {
        link = req.params.link;
    }     
    console.log(link);
    var originalLink = req.protocol + "s://" + req.get("host") + "/" + link;
    var shortenLink  = req.protocol + "s://" + req.get("host") + "/s";

    res.json({
        "original": originalLink.toString(),
        "shorten": shortenLink.toString(),
    });
})


app.get("/s",function(req,res,next){
    console.log("redirect working" + link);
    res.redirect( link );    
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Working");
})