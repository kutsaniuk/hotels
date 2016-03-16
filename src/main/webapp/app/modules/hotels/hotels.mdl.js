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
					templateUrl: '/app/modules/hotels/new/hotel.new.view.html',
					controller: 'HotelsCtrl'
				}
			}
		})
		.state('main.hotels.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/hotels/new/hotel.new.view.html',
					controller: 'HotelsCtrl'
				}
			}
		});

		$locationProvider.html5Mode(true);
	}

})();
