var express     = require('express');
var morgan      = require('morgan');
var compression = require('compression');
var port        = 9000;
var app         = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.static('public'));

app.get('/*', function(req, res) {
    res.redirect('/');
});

app.listen(port);
console.log('Static web server started on port: ' + port);