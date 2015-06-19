var express = require('express');
var bodyParser = require('body-parser');
var app = express();
 
// Cislo portu, na kterem pobezi server
var port = 9000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// pole s poznamkami
var notes = [
    { id: 1, title: "Prvni poznamka"},
    { id: 2, title: "Dalsi poznamka"},
];

// Implementace REST API
// GET /notes 
app.get("/notes/", function(req, res){
    if(notes.length){
        return res.send(notes);
        res.sendStatus(200);
    }
    else{
        //res.sendStatus(404);   
    }
})

// GET /notes/{id}
app.get("/notes/:id", function(req, res){
    for(var i = 0; i < notes.length; i++){
        if(req.params.id == notes[i].id){
            return res.send(notes[i]);
            res.sendStatus(200);
        }
    }
    res.sendStatus(404);
})

// DELETE /notes/{id}
app.delete("/notes/:id", function(req, res){
    for(var i = 0; i < notes.length; i++){
        if(notes[i].id == req.params.id){
            notes.splice(i, 1);
            res.sendStatus(204);
            for(var i=0; i < notes.length; i++){
                notes[i].id = i+1;
            }
        }
    }
    res.sendStatus(404);
})

// POST /notes
app.post("/notes", function(req, res){
    var note = {};
    note.id = notes.length + 1;
    note.title = req.body.title;
    notes.push(note);
    res.sendStatus(201);
    return res.send(note);
})

// PUT /notes/{id}
app.put("/notes/:id", function(req, res){
    for(var i = 0; i < notes.length; i++){
        if(req.params.id == notes[i].id){
            notes[i].title = req.body.title;
            return res.send(notes[i]);
        }
    }
    res.sendStatus(404);
})


// UI aplikace: http://localhost:9000
app.get('/', function(req, res) {
    res.render('pages/index');
});


// start App
var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Aplikace bezi na http://%s:%s', host, port);

});