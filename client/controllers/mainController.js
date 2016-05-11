'use strict';

module.exports = function($scope) {

    $scope.menuItems = [
		{
			text: 'New Game',
			url: 'game.setup'
		},
		{
			text: 'Options',
			url: 'options'
		}
	];
};
