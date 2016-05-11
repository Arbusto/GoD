
'use strict';

module.exports = function($http, $q) {

	this.getConfig = function(){
		var deferred = $q.defer();

		$http.get('/api/getConfig')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(msg, error) {
				deferred.reject(msg);
			});

		return deferred.promise;
	};

	this.getOriginalConfig = function(){
		var deferred = $q.defer();

		$http.get('/api/getOriginalConfig')
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(msg, error) {
				deferred.reject(msg);
			});

		return deferred.promise;
	};

	this.updateConfig = function(config){
		var deferred = $q.defer();
		$http.post('/api/updateConfig', config)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(msg, error) {
				deferred.reject(msg);
			});

		return deferred.promise;
	};
};
