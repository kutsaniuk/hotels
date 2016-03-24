(function () {
	'use strict';

	var hotels = angular.module('hotels', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.hotels', {
			url: 'hotels',
			views: {
				'': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'HotelsCtrl',
				}
			}
		})
		.state('main.hotels.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/hotels/action/hotels.action.view.html',
					controller: 'HotelNewCtrl'
				}
			}
		})
		.state('main.hotels.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/hotels/action/hotels.action.view.html',
					controller: 'HotelEditCtrl'
				}
			}
		})
		.state('main.hotels.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/hotels/action/hotels.action.delete.view.html',
					controller: 'HotelDeleteCtrl'
				}
			}
		});

	}

})();
