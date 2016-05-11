'use strict';

var slug = require('slug');

module.exports = function($scope, $state, optionsService, configService) {

	configService.getConfig().then(function(data){
		$scope.moves = data[0].moves;
	});

	$scope.optionsHeader = {
		text: "Options"
	};

	$scope.addMoveButton = {
			text: "Add new move",
			action: function(){
				var newMove = {
					name: $scope.newMove.name,
					defeats: []
				};

				$scope.moves[slug($scope.newMove.name, {replacment:'_', lower:true})] = newMove;
				$scope.newMove.name = null;
				console.log($scope.moves);
			}
	};

	$scope.quitButton = {
		text: "Back",
		action: function(){
			$state.go('title');
		}
	};

	$scope.restoreButton = {
		text: "Restore",
		action: function(){
			optionsService.restore();
		}
	};

	$scope.saveButton = {
		text: "Save",
		action: function(){
			optionsService.saveMoves($scope.moves);
		}
	};
};
