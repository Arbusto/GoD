'use strict';
require('angular');

var app = angular.module('app', [
	require('angular-material'),
	require('angular-ui-router/release/angular-ui-router')
]);
app.config(require('./config.js'));
app.service('gameService', require('./services/gameService'));
app.service('optionsService', require('./services/optionsService'));
app.service('configService', require('./services/configService'));
app.directive('draggable', require('./directives/draggable'));
app.directive('droppable', require('./directives/droppable'));
