var express     = require("express");
var path        = require("path");
var bodyParser  = require("body-parser");
var cors        = require("cors");
var mongoose    = require("mongoose");
var url         = require("./models/url"); 
var app         = module.exports = express();



// connect mongodb to app
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/url", { useMongoClient: true });

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/o/:link(*)",function(req,res){
    //prevent favicon.ico request make link's value to favicon.ico
    if (req.params.link == "favicon.ico") {
        return;
    } else {
        var link = req.params.link;
    }     
    console.log(link); 
    var holderIndex = Math.floor(Math.random()*1000).toString();
    // create object to save to mongodb
    // must use exactly declared schema (structure) in models
    var data = new url ({
        original: link,
        holderIndex: holderIndex,
    })   
    //save object data to mongodb
    data.save(function(err){
        if (err) return res.end("database error");
    });

    var originalLink = req.protocol + "s://" + req.get("host") + "/" + link;
    var shortenLink  = req.protocol + "s://" + req.get("host") + "/s/" + holderIndex;
    

    res.json({
        "original": originalLink.toString(),
        "shorten": shortenLink.toString(),
    });
    
})

app.get("/s/:holderIndex",function(req,res,next){
    var holderIndex = req.params.holderIndex;                   
    url.findOne({"holderIndex" : holderIndex}, function(err,data){
        if(err) return res.end("database error");
        //handle return null data
        if(!data) return res.end("Invalid link");
        var link = data.original;
        var reg = new RegExp ("^(http|https)://","i"); 
        if ((reg).test(link)){
            res.redirect(301, link);
        } else {
            res.redirect(301, "http://" + link)
        }                        
    }) 
    
    
    
                
})
    

app.listen(process.env.PORT || 3000, function(){
    console.log("Working");
})