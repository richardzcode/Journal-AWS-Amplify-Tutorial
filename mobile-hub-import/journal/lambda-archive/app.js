var express = require('express'),
    body_parser = require('body-parser');

var storage = require('./routers/storage.js');

var app = express();
app.use(body_parser.json());

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/storage', storage);

const port = 3000
app.listen(port, function() {
    console.log("App started on port " + port);
});

module.exports = app
