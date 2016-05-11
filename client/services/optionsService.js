'use strict';

module.exports = function(configService) {

	var config = {
		neededRounds: 3,
		moves: {
			'rock': {
				name: 'Rock',
				defeats: [
					'scissors',
				]
			},
			'paper':{
				name: 'Paper',
				defeats: [
					'rock'
				]
			},
			'scissors' : {
				name: 'Scissors',
				defeats: [
					'paper'
				]
			},
		}
	};

	configService.getConfig().then(function(data){
			config = data[0];
	});

	this.getMoves = function(){
		return config.moves;
	};


	this.saveMoves = function(moves){
		for (var move in moves) {
			if('string' === typeof moves[move].defeats){
				if (moves[move].defeats.substring(0, 1) == ',') {
				  moves[move].defeats = moves[move].defeats.substring(1);
				}
				moves[move].defeats = moves[move].defeats.split(",");
			}
		}
		config.moves = moves;
		configService.updateConfig(config).then(function(data){
			return data;
		});
	};

	this.restore = function(){
		var originalConfig;
		configService.getOriginalConfig().then(function(data){
			var originalConfig = data[0];
			delete originalConfig._id;
			configService.updateConfig(originalConfig).then(function(data){
				return data;
			});
		});
	};
};
