(function () {
	'use strict';

	var hotel = angular.module('hotel', [
		'ui.router'
		])
	.config(configure); 

	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.hotel', {
			url: 'hotel',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.hotel.list', {
			url: '/list',
			views: {
				'content@main.hotel': {
					templateUrl: '/app/modules/hotel/list/hotel.list.view.html',
					controller: 'HotelCtrl'
				},
				'filter@main.hotel.list': {
					templateUrl: '/app/modules/hotel/filter/hotel.filter.view.html'
				}

			}
		})
		.state('main.hotel.table', {
			url: '',
			views: {
				'content@main.hotel': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'HotelCtrl'
				},
				'filter@main.hotel.table': {
					templateUrl: '/app/modules/hotel/filter/hotel.filter.view.html'
				}

			}
		})
		.state('main.hotel.profile', { 
			url: '/:id',
			views: {
				'content@main.hotel': {
					templateUrl: '/app/modules/hotel/profile/hotel.profile.view.html',
					controller: 'HotelProfileCtrl'
				}
			}
		});
	}

})();
