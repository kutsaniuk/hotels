(function () {
	'use strict';

	var workers = angular.module('workers', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.workers', {
			url: 'workers',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'WorkersCtrl',
				}
			}
		})
		.state('main.workers.add', {
			url: '/add',
			views: {
				'add': {
					templateUrl: '/app/modules/workers/add/worker.add.view.html',
					controller: 'WorkersCtrl'
				}
			}
		});

		$locationProvider.html5Mode(true);
	}

})();
