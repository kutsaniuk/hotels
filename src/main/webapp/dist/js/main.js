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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelsCtrl', HotelsCtrl);

	function HotelsCtrl($scope) {
		var sc = $scope;
		sc.table = 'Hotels';
		sc.tableDataRows = 'hotels'

		sc.tableHeader = 
		[
			'Name', 
			'Country',
			'City',
			'Adress',
			'Director',
			'Email',
			'Phone of Director',
			'Phone Orders'
		];

		sc.tableData = 
		[
			{
				'name': 'aaa', 
				'country': 'aaa',
				'city': 'aaa',
				'adress': 'aaa',
				'director': 'aaa',
				'email': 'aaa',
				'phoneOfDirector': 'aaa',
				'phoneOrders': 'aaa'
			},
			{
				'name': 'bbb', 
				'country': 'bbb',
				'city': 'bbb',
				'adress': 'bbb',
				'director': 'bbb',
				'email': 'bbb',
				'phoneOfDirector': 'bbb',
				'phoneOrders': 'bbb'
			},

		];


	};

})();

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
		});

		$locationProvider.html5Mode(true);
	}

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomsCtrl', RoomsCtrl);

	function RoomsCtrl($scope) {
		var sc = $scope;
		sc.table = 'Rooms';
		sc.tableDataRows = 'rooms'

		sc.tableHeader = 
		[
			'Room type', 
			'Number of rooms',
			'Type of bed',
			'Breakfast',
			'Price'
		];

		sc.tableData = 
		[
			{
				'roomType': '3', 
				'numberOfRooms': 'aaa',
				'typeOfBed': 'aaa',
				'breakfast': 'aaa',
				'price': 'aaa'
			},
			{
				'roomType': '3', 
				'numberOfRooms': 'aaa',
				'typeOfBed': 'aaa',
				'breakfast': 'aaa',
				'price': 'aaa'
			}

		];


	};

})();

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
		});

		$locationProvider.html5Mode(true);
	}

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersCtrl', WorkersCtrl);

	function WorkersCtrl($scope) {
		var sc = $scope;
		sc.table = 'Workers';
		sc.tableDataRows = 'workers'

		sc.tableHeader = 
		[
			'Full name', 
			'Position',
			'Birthday',
			'Age',
			'Sex',
			'Experience',
			'Previous position',
			'Date'
		];

		sc.tableData = 
		[
			{
				'fullName': '2', 
				'position': 'aaa',
				'birthday': 'aaa',
				'age': 'aaa',
				'sex': 'aaa',
				'experience': 'aaa',
				'previousPosition': 'aaa',
				'date': 'aaa'
			},
			{
				'fullName': '2', 
				'position': 'aaa',
				'birthday': 'aaa',
				'age': 'aaa',
				'sex': 'aaa',
				'experience': 'aaa',
				'previousPosition': 'aaa',
				'date': 'aaa'
			}

		];


	};

})();

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
		});

		$locationProvider.html5Mode(true);
	}

})();
