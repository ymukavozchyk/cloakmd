'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var fs = require('fs');
var port = process.env.PORT || 9000;
var app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(express.static('public'));

//serves README.md file or default text in case of error
app.get('/aboutmd', function (req, res) {
    fs.readFile('README.md', 'utf-8', function (err, data) {
        if (err) {
            return res.json('# [About CloakMD](https://github.com/ymukavozchyk/cloakmd)');
        }
        else {
            return res.json(data);
        }
    });
});

app.get('/*', function (req, res) {
    res.redirect('/');
});

app.listen(port);
console.log('Static web server started on port: ' + port);