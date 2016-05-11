'use stict';
var slug = require('slug');
module.exports = function(){
	return {
        scope: {
            drop: '&' // parent
        },
		require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var el = element[0];
            el.addEventListener('drop', function(e) {
				var data = e.dataTransfer.getData('Text');
				var value = angular.element(el).val();
				angular.element(el).val(value+','+slug(data, {replacment:'_', lower:true}));
				ctrl.$setViewValue(element.val());
            },false);
        }
    };
};
