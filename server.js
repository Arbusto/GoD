'use strict';

	var express = require('express');
	var mongoose = require('mongoose');
	var bodyParser = require('body-parser');// pull information from HTML POST (express4)

	var app = express();
	mongoose.connect('mongodb://localhost:27017/God'); // db connection
	app.use(bodyParser.json());
	require('./server/model')(app, mongoose);

	app.use(express.static(__dirname + '/public'));
	app.get('*', function(req, res) {
        res.sendFile('public/views/index.html', { root : __dirname}); // load the single view file (angular will handle the page changes on the front-end)
    });

	app.listen(3000);
