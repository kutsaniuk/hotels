(function () {
	'use strict';

	var hotels = angular.module('hotels', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.hotel', {
			url: 'hotel',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'HotelsCtrl',
				}
			}
		})
		.state('main.hotel.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/hotel/action/hotel.action.view.html',
					controller: 'HotelNewCtrl'
				}
			}
		})
		.state('main.hotel.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/hotel/action/hotel.action.view.html',
					controller: 'HotelEditCtrl'
				}
			}
		})
		.state('main.hotel.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/hotel/action/hotel.action.delete.view.html',
					controller: 'HotelDeleteCtrl'
				}
			}
		});

	}

})();
