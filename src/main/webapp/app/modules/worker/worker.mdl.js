(function () {
	'use strict';

	var worker = angular.module('worker', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.worker', {
			url: 'worker',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.worker.table', {
			url: '', 
			views: {
				'content@main.worker': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'WorkerCtrl',
				},
				'filter@main.worker.table': {
					templateUrl: '/app/modules/worker/filter/worker.filter.view.html'
				}
			}
		})
		.state('main.worker.profile', { 
			url: '/:id',
			views: {
				'content@main.worker': {
					templateUrl: '/app/modules/worker/profile/worker.profile.view.html',
					controller: 'WorkerProfileCtrl'
				}
			}
		});
	}

})();
