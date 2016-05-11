'use strict';
module.exports = function($stateProvider, $locationProvider) {
  $stateProvider
		.state('title', {
			url: '',
			controller: require('./controllers/mainController'),
			templateUrl: '../templates/title.html'
		})
		.state('game', {
			abstract:true,
			controller: require('./controllers/gameController'),
			templateUrl: '../templates/game.html'
		})
		.state('game.setup', {
				templateUrl: '../templates/match_setup.html'
		})
		.state('game.moves', {
				templateUrl: '../templates/match_move_selection.html'
		})
		.state('game.round', {
				templateUrl: '../templates/match_round.html'
		})
		.state('game.end', {
				templateUrl: '../templates/match_end.html'
		})
		.state('options', {
			controller: require('./controllers/optionsController'),
			templateUrl: '../templates/options.html'
		});
};
