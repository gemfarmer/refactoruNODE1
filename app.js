
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs'); //make sure to require file system

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//serve static site
app.get('/', function(req, res){
	fs.readFile(__dirname + '/index.html', function(err, data){
		res.setHeader('Content-Type', 'text/html')
		res.send(data)
	})
	
});

//Routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hi', function(req, res){
	res.send('<h1>Hi</h1>');
});
app.get('/there', function(req, res){
	res.send('<h1>there</h1>');
});
app.get('/you', function(req, res){
	res.send('<h1>you made it!</h1>');
});
app.post('/formsubmit', function(req, res){
	
	console.log(req.body.firstname)
	console.log(req.body.lastname)
	res.send(req.body.firstname+ " "+req.body.lastname)

});
app.post('/success', function(req, res){
	console.log('success')
	res.send('<div>SUCCESS</div>')
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
