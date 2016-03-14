(function () {
	'use strict';

	var main = angular.module('main', [
		'hotels',
		'workers',
		'rooms',
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get("$state");
			$state.go('main.tables');
		});

		$stateProvider
		.state('main', {
			url: '/',
			abstract: true,
			templateUrl: '/app/components/main/main.view.html'
		})
		.state('main.tables', {
			url: 'tables',
			views: {
				'': {
					templateUrl: '/app/components/tables/tables.view.html'
				}
			}
		});

		$locationProvider.html5Mode(true);
	}

})();
