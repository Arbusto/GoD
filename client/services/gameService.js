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

	var players = {
		player1: {
			name: null,
			move: null,
			victories: 0
		},
		player2: {
			name: null,
			move: null,
			victories: 0
		}
	};

	var currentRound = 0;
	var currentPlayer = null;

	this.winner = function(){
		if(players.player1.victories >= config.neededRounds){
			return players.player1;
		} else if (players.player2.victories >= config.neededRounds){
			return players.player2;
		} else {
			return false;
		}
	};

	this.playerNeedsMove = function(){
		if(players.player1.move === null){
			currentPlayer = 'player1';
			return players.player1.name;
		} else if (players.player2.move === null){
			currentPlayer = 'player2';
			return players.player2.name;
		} else {
			return false;
		}
	};

	this.getMoves = function(){
		return config.moves;
	};

	this.getRound = function(){
		return currentRound;
	};

	this.initPlayers = function(names){
		if(names.name1 === null){
			players.player1.name = "Anonymous Drone 1";
		}else{
			players.player1.name = names.name1;
		}
		if(names.name2 === null){
			players.player2.name = "Anonymous Drone 2";
		}else{
			players.player2.name = names.name2;
		}
	};

	this.setMove = function(move){
		players[currentPlayer].move = move;
		return true;
	};

	this.setRound = function(){
		currentRound++;
		return currentRound;
	};

	this.calculateOutcome = function(){
		var p1Move = config.moves[players.player1.move];
		var p2Move = config.moves[players.player2.move];

		if(p1Move.defeats.indexOf(players.player2.move) >= 0){
			players.player1.victories += 1;
			return {
				victor: players.player1,
				winningMove: p1Move.name,
				losingMove: p2Move.name,
				remainigWins: config.neededRounds - players.player1.victories
			};
		} else if (p2Move.defeats.indexOf(players.player1.move) >= 0){
			players.player2.victories += 1;
			return {
				victor: players.player2,
				winningMove: p2Move.name,
				losingMove: p1Move.name,
				remainigWins: config.neededRounds - players.player2.victories
			};
		} else {
			return {
				winningMove: p2Move.name,
				losingMove: p1Move.name,
				remainigWins: config.neededRounds
			};
		}
	};

	this.resetMoves = function(){
		players.player1.move = null;
		players.player2.move = null;
		return true;
	};

	this.endMatch = function(){
		players = {
			player1: {
				name: null,
				move: null,
				victories: 0
			},
			player2: {
				name: null,
				move: null,
				victories: 0
			}
		};

		currentRound = 0;
		currentPlayer = null;
	};
};
