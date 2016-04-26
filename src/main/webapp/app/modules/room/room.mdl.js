(function () {
	'use strict';

	var room = angular.module('room', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.room', {
			url: 'room',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.room.table', {
			url: '', 
			views: {
				'content@main.room': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'RoomCtrl', 
				},
				'filter@main.room.table': {
					templateUrl: '/app/modules/room/filter/room.filter.view.html'
				}
			}
		});

	}

})();
