(function () {
	'use strict';

	var rooms = angular.module('rooms', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.rooms', {
			url: 'rooms',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'RoomsCtrl',
				}
			}
		})
		.state('main.rooms.add', {
			url: '/add',
			views: {
				'add': {
					templateUrl: '/app/modules/rooms/add/room.add.view.html',
					controller: 'RoomsCtrl'
				}
			}
		});

		$locationProvider.html5Mode(true);
	}

})();
