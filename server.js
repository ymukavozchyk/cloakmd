var express     = require('express');
var compression = require('compression');
var port        = process.env.PORT;
var app         = express();

app.use(compression());
app.use(express.static('public'));

app.get('/*', function(req, res) {
    res.redirect('/');
});

app.listen(port);