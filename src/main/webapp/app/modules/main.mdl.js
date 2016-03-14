(function () {
	'use strict';

	var main = angular.module('main', [
		'ui.router',
		'ngAnimate'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get("$state");
			$state.go('main.feed');
		});

		$stateProvider
		.state('main', {
			url: '/',
			abstract: true,
			templateUrl: '/app/components/main/main.view.html',
		})
		.state('main.feed', {
			url: 'feed',
			views: {
				'': {
					templateUrl: 'app/components/feed/feed.view.html',
					controller: 'MainCtrl'
				}
			}
		})
		.state('main.profile', {
			url: 'profile',
			views: {
				'': {
					templateUrl: 'app/components/profile/profile.view.html',
					controller: 'MainCtrl'
				}
			}
		})
		.state('login', {
			url: '/login',
			templateUrl: 'app/components/login/login.view.html',
			controller: 'MainCtrl'
		});

		$locationProvider.html5Mode(true);

	}

	main.controller('MainCtrl', function ($scope) {

		$scope.loginShow = true;
		$scope.signupShow = false;

		$scope.size = 4;

		$scope.eventLocation = function () {
			$scope.showMap = true;
		}

		$scope.m = [{
					'name': 'asdads',
					'lastname': 'ascasc',
					'city': 'asc',
					'asc': 'asc'
				}]

	});
})();
