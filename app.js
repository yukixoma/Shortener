

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = module.exports = express();
var link;
var holder = [];

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"))


app.get("/o/:link(*)",function(req,res){
    if (req.params.link == "favicon.ico") {
        return;
    } else {
        link = req.params.link;
    }     
    console.log(link); 
    var holderIndex = Math.floor(Math.random()*1000).toString();
    holder[holderIndex] = link;   
    var originalLink = req.protocol + "s://" + req.get("host") + "/" + link;
    var shortenLink  = req.protocol + "s://" + req.get("host") + "/s/" + holderIndex;
    

    res.json({
        "original": originalLink.toString(),
        "shorten": shortenLink.toString(),
    });
})

app.get("/s/:holderIndex",function(req,res,next){
    var holderIndex = req.params.holderIndex;
    link = holder[holderIndex];
    console.log("redirect working on " +link);
    if(link[0]+link[1]+link[2]+link[3] != "http") {
        link = "http://" + link;
    }
    res.redirect(301, link);    
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Working");
})