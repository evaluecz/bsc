var express = require('express');
var app = express();

// Cislo portu, na kterem pobezi server
var port = 9000;

app.set('views', './views');


app.get('/', function (req, res) {
    res.send('1. funkcni kostra aplikace...');
});

var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Aplikace bezi na http://%s:%s', host, port);

});