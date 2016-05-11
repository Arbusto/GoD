'use strict';

 module.exports = function(){
     return{
         restrict: 'A',
         scope: {},
         link: function (scope, element, attr) {
            var el = element[0];
			el.draggable = true;

			el.addEventListener('dragstart', function(e) {
				var data = angular.element(e.srcElement).text();
				e.dataTransfer.effectAllowed = 'move';
				e.dataTransfer.setData('Text', data);
				this.classList.add('drag');
				return false;
			}, false);

			el.addEventListener('dragend', function(e) {
				this.classList.remove('drag');
				return false;
			},false	);
		}
	};
 };
