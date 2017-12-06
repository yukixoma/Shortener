var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var urlSchema = new Schema ({
    original: String,
    holderIndex: String,
}, {timestamps: true});

var ModelClass = mongoose.model("url", urlSchema); //  url is collection, urlSchema is Schema name

module.exports = ModelClass; // to use this file in another app