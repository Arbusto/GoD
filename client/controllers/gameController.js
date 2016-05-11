'use strict';

module.exports = function($scope, $state, gameService, configService) {
	$scope.gameHeader = {
		text: 'Who are you?'
	};

	$scope.players = {
		name1: null,
		name2: null
	};

	configService.getConfig().then(function(data){
		$scope.moves = data[0].moves;
	});

	$scope.confirmButton = {
		text: 'Confirm Move!',
		show: false,
		action: function(move){
			gameService.setMove(move);
			$scope.selectedMove = null;
			$scope.confirmButton.show = false;
			$scope.nextButton.disabled = false;
			$scope.showSelection = false;
		}
	};

	$scope.quitButton = {
		text: 'Back to Main Menu!',
		show: false,
		action: function(){
			gameService.endMatch();
			$state.go('title');
		}
	};

	$scope.nextButton = {
		text: 'Start!',
		disabled: false,
		action: function(){
			$scope.quitButton.show = false;
			var currentRound = gameService.getRound();
			if(0 === currentRound){
				gameService.initPlayers($scope.players);
			}
			play();
		}
	};

	var play = function(){
		var notReady = gameService.playerNeedsMove();
		if(notReady){
			$scope.gameHeader.text = notReady+"'s Turn";
			$scope.nextButton.text = 'Advance!';
			$scope.nextButton.disabled = true;
			$scope.confirmButton.show = true;
			$scope.showSelection = true;
			$state.go('game.moves');
		} else {
			$scope.roundWinner = gameService.calculateOutcome();
			$scope.currentRound = gameService.setRound();

			// show quit and play agian buttons
			if(gameService.winner()){
				$scope.gameHeader.text = " All hail the new Emperor !!!";
				$state.go('game.end');
				gameService.endMatch();
				$scope.nextButton.text = 'Play Again';
				$scope.quitButton.show = true;
				// Could assing $state.go('game.setup') on $scope.nextButton.action to Ask for names agian
			} else {
				$scope.nextButton.text = 'Next Round!';
				if($scope.roundWinner.victor){
					$scope.gameHeader.text = $scope.roundWinner.victor.name +" wins round " + $scope.currentRound + "!!!";
				} else {
					$scope.gameHeader.text = "Round " + $scope.currentRound + " has no clear winner";

				}
				$state.go('game.round');
				gameService.resetMoves();
			}
		}
	};

};
