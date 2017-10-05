/**
 * Created by AlbertoTsang on 10/3/17.
 */
var express = require("express");
var router = express.Router();

var app = express();
var port = 8080;

//we require this libraly to get POST data
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var read = require('./read');
var create = require('./create');
var update = require('./update');
var del = require('./delete');
var login = require('./login');


app.use('/read', read);
app.use('/create', create);
app.use('/update', update);
app.use('/delete', del);
app.use('/login', login);


app.set('view engine', 'jade');

app.get('/', function(req, res){
    //res.send("Hello World!");
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});



/*
read.post('/', function(req, res, next) {
    var user_id = req.body.id;

    res.send('User id is: ' + user_id);
});
*/

app.listen(port);
console.log('Server started! At http://localhost:' + port);