(function () {
	'use strict';

	var main = angular.module('main', [
		'hotels',
		'workers',
		'rooms',
		'ui.router',
		'ui.bootstrap',
		'ngResource'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get("$state");
			$state.go('main.home');
		});

		$stateProvider
		.state('main', {
			url: '/',
			abstract: true,
			templateUrl: '/app/components/main/main.view.html',
			controller: 'SidebarCtrl'
		})
		.state('main.home', {
			url: 'home',
			views: {
				'': {
					templateUrl: '/app/components/home/home.view.html'
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

	function HotelsCtrl ($scope, $state, $location, HotelsService) {
		var sc = $scope;
		var activeTable = $location.path();

		sc.table = 'hotels';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'country',
		'city',
		'adress',
		'director',
		'email',
		'phoneOfDirector',
		'phoneOrders'
		];

		HotelsService.getAll()
		.success(function (data) {
			sc.tableData = data;
			sc.totalItems = sc.tableData.length;
		});

		sc.openEdit = function (id) {
			$state.go('main.hotels.edit');
			sc.id = id;
		}

		sc.openAdd = function () {
			$state.go('main.hotels.new');
		}

		sc.openDelete = function (id) {
			$state.go('main.hotels.delete');
			sc.id = id;
		}

		sc.close = function () {
			$state.go('main.' + sc.table);
		}
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
		})
		.state('main.hotels.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/hotels/action/hotel.action.view.html',
					controller: 'HotelNewCtrl'
				}
			}
		})
		.state('main.hotels.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/hotels/action/hotel.action.view.html',
					controller: 'HotelEditCtrl'
				}
			}
		})
		.state('main.hotels.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/hotels/action/hotel.action.delete.view.html',
					controller: 'HotelDeleteCtrl'
				}
			}
		});

		$locationProvider.html5Mode(true);
	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('HotelsService', function ($http) {

        var urlBase = '../data/hotels/';

        this.getAll = function () {
            return $http.get(urlBase + 'hotels.list.json');
        };

        this.get = function (id) {
            return $http.get(urlBase + id);
        };

        this.new = function (hotel) {
            return $http.post(urlBase, hotel);
        };

        this.update = function (id, hotel) {
            return $http.put(urlBase + id, hotel)
        };

        this.delete = function (id) {
            return $http.delete(urlBase + id);
        };

    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomsCtrl', RoomsCtrl);

	function RoomsCtrl($scope) {
		var sc = $scope;
		sc.table = 'Rooms';
		sc.base = 'rooms';

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

		sc.totalItems = $scope.tableData.length;
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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersCtrl', WorkersCtrl);

	function WorkersCtrl($scope) {
		var sc = $scope;
		sc.table = 'Workers';
		sc.base = 'workers'

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
		// Pagination
		sc.totalItems = $scope.tableData.length;
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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SidebarCtrl', SidebarCtrl);

	function SidebarCtrl($scope, $location) {  
		var sc = $scope;   

        sc.location = function() {
            return $location.path();
        }    
    }
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('TableCtrl', TableCtrl);

	function TableCtrl($scope, $state) {  
		var sc = $scope;
		
		// Pagination
		sc.viewby = 8;
		sc.currentPage = 1;
		sc.itemsPerPage = sc.viewby;
		sc.maxSize = 5;

        //Sort 
        sc.fieldName = undefined;
        sc.reverse = false;

        sc.sort = function(fieldName) {
            $scope.reverse = ($scope.fieldName === fieldName) ? !$scope.reverse:false;
            $scope.fieldName = fieldName;
        }

        sc.isSortUp = function(fieldName) {
        	return sc.fieldName === fieldName && !sc.reverse;
        };

        sc.isSortDown = function(fieldName) {
        	return sc.fieldName === fieldName && sc.reverse;
        };
    }
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('ActionCtrl', ActionCtrl);

	function ActionCtrl ($scope, $state, $location, HotelsService) {
		var sc = $scope;

		// sc.close = function (table)
		// 	$state.go('main.' + table);
		// }
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelEditCtrl', HotelEditCtrl);

	function HotelEditCtrl ($scope, $state, $location, HotelsService) {
		var sc = $scope;

		sc.action = 'Edit';

		HotelsService.get(sc.id)
		.success(function (data) {
			sc.hotel = data;
			sc.name = sc.hotel.name;
			sc.country = sc.hotel.country;
			sc.city = sc.hotel.city;
			sc.adress = sc.hotel.adress;
			sc.director = sc.hotel.director;
			sc.email = sc.hotel.email;
			sc.phoneOfDirector = sc.hotel.phoneOfDirector;
			sc.phoneOrders = sc.hotel.phoneOrders;

			sc.save = function () {
				sc.hotel = {
					'name': sc.name,
					'country':sc.country,
					'city': sc.city,
					'adress': sc.adress,
					'director': sc.director,
					'email': sc.email,
					'phoneOfDirector': sc.phoneOfDirector,
					'phoneOrders': sc.phoneOrders
				}

				HotelsService.update(sc.id, sc.hotel)
				.success(function (data) {
					alert('updated!');
					sc.hotel = null;
				});
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelDeleteCtrl', HotelDeleteCtrl);

	function HotelDeleteCtrl ($scope, $state, $location, HotelsService) {
		var sc = $scope;

		sc.delete = function () {
			HotelsService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.hotel = null;
			});
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelNewCtrl', HotelNewCtrl);

	function HotelNewCtrl ($scope, $state, $location, HotelsService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = null;
		sc.country = null;
		sc.city = null;
		sc.adress = null;
		sc.director = null;
		sc.email = null;
		sc.phoneOfDirector = null;
		sc.phoneOrders = null;

		
		sc.save = function () {
			sc.hotel = {
				'name': sc.name,
				'country':sc.country,
				'city': sc.city,
				'adress': sc.adress,
				'director': sc.director,
				'email': sc.email,
				'phoneOfDirector': sc.phoneOfDirector,
				'phoneOrders': sc.phoneOrders
			}

			HotelsService.new(sc.hotel)
			.success(function (data) {
				alert('added!');
				sc.hotel = null;
			});
		}
	};
})();
