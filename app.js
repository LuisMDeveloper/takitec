/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , mongoose = require('mongoose')
    , http = require('http')
    , fs = require('fs')
    , path = require('path');

//mongoose.connect('mongodb://localhost/takitec-development');
mongoose.connect('mongodb://LuisMDeveloper:SEmAGnksF7SB@ds061198.mongolab.com:61198/druid');
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

var home = require('./app/controllers/home');
var admin = require('./app/controllers/admin');
app.get('/', home.index);
app.get('/dictionary', home.indexSpell);
app.post('/dictionary', home.spell);
app.get('/admin', admin.index);
app.post('/admin', admin.post);
app.post('/word/remove', admin.remove);
app.get('/users/create', home.createUsers);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
