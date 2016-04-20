(function () {
	'use strict';

	var main = angular.module('main', [
		'hotel',
		'workers',
		'rooms',
		'ui.router',
		'ui.bootstrap',
		'ngResource',
		'pascalprecht.translate'
		])
	.config(configure).
	run(run);


	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];
	function configure($stateProvider, $urlRouterProvider, $translateProvider) {

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

		$translateProvider.useStaticFilesLoader({
            prefix: '/app/resources/lang/',
            suffix: '.json'
          });
	}

	function run($translate) {
		$translate.use('uk');
	}
})();
(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelsCtrl', HotelsCtrl);

	function HotelsCtrl ($scope, $state, $http, $translate, HotelsService) {
		var sc = $scope;

		sc.table = 'hotel';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'adress',
		'director',
		'email',
		'phoneOfDirector',
		'phoneOrders'
		];

		sc.openEdit = function (id) {
			$state.go('main.hotel.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.hotel.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.hotel.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			HotelsService.getPage(currentPage, 10)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.searchByField = function(field, value) {
			if (value != '') {
				HotelsService.searchByField(field, value)
				.success(function (data){
					sc.main = data;
				});
			}
			else sc.loadPage(1); 
		};

		sc.loadPage(1); 

		$http.get('app/shared/dropdown/countries/countries.json').success(function (data) {
			sc.countriesWithFlags = data;
		});

		// sc.keys = Object.keys(sc.country);
		
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

(function () {
    'use strict';

    angular.module('main')
    .service('HotelsService', function ($http) {

        var urlBase = '../data/hotel/';

        this.getAll = function () {
            return $http.get(urlBase + 'hotel.list.json');
        };

        this.get = function (id) {
            return $http.get(urlBase + id + '.json');
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

        this.searchByField = function (field, value) {
            return $http.get(urlBase + 'hotels_search_' + field + '=' + value + '.json');
        };

        this.getPage = function (currentPage, size) {
            return $http.get(urlBase + 'hotels_page=' + currentPage + '_size=' + size + '.json');
        };

    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomsCtrl', RoomsCtrl);

	function RoomsCtrl($scope, $state, RoomsService) {
		var sc = $scope;
		
		sc.table = 'rooms';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'roomOfType', 
		'numberOfRooms',
		'typeOfBed',
		'breakfast',
		'price'
		];

		sc.openEdit = function (id) {
			$state.go('main.rooms.edit');
			sc.id = id;
		}

		sc.openAdd = function () {
			$state.go('main.rooms.new');
		}

		sc.openDelete = function (id) {
			$state.go('main.rooms.delete');
			sc.id = id;
		}

		sc.close = function () {
			$state.go('main.' + sc.table);
		}

		sc.loadPage = function(currentPage) {
			RoomsService.getPage(currentPage, 10)
			.success(function(data){
				sc.main = data;
			});
		};

		sc.searchByField = function(field, value) {
			if (value != '') {
				RoomsService.searchByField(field, value)
				.success(function(data){
					sc.main = data;
				});
			}
			else sc.loadPage(1); 
		};

		sc.loadPage(1); 
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
		.state('main.rooms.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/rooms/action/rooms.action.view.html',
					controller: 'RoomNewCtrl'
				}
			}
		})
		.state('main.rooms.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/rooms/action/rooms.action.view.html',
					controller: 'RoomEditCtrl'
				}
			}
		})
		.state('main.rooms.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/rooms/action/rooms.action.delete.view.html',
					controller: 'RoomDeleteCtrl'
				}
			}
		});

	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('RoomsService', function ($http) {

        var urlBase = '../data/rooms/';

        this.getAll = function () {
            return $http.get(urlBase + 'rooms.list.json');
        };

        this.get = function (id) {
            return $http.get(urlBase + id + '.json');
        };

        this.new = function (room) {
            return $http.post(urlBase, room);
        };

        this.update = function (id, room) {
            return $http.put(urlBase + id, room)
        };

        this.delete = function (id) {
            return $http.delete(urlBase + id);
        };

        this.searchByField = function (field, value) {
            return $http.get(urlBase + 'rooms_search_' + field + '=' + value + '.json');
        };

        this.getPage = function (currentPage, size) {
            return $http.get(urlBase + 'rooms_page=' + currentPage + '_size=' + size + '.json');
        };

    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersCtrl', WorkersCtrl);

	function WorkersCtrl($scope, $state, WorkersService) {
		var sc = $scope;

		sc.table = 'workers';
		sc.base = '/' + sc.table;

		sc.currentDate = new Date().getFullYear();

		sc.getAge = function () {
			if (sc.birthday != '') alert(sc.birthday);
			else sc.age = null;
		}

		sc.tableHeader = 
		[
		'fullName', 
		'position',
		'birthday',
		'age',
		'sex',
		'experience',
		'previousPosition',
		'date'
		];

		sc.openEdit = function (id) {
			$state.go('main.workers.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.workers.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.workers.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			WorkersService.getPage(currentPage, 10)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.searchByField = function(field, value) {
			if (value != '') {
				WorkersService.searchByField(field, value)
				.success(function (data){
					sc.main = data;
				});
			}
			else sc.loadPage(1); 
		};

		sc.loadPage(1); 
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
		.state('main.workers.new', {
			url: '/new',
			views: {
				'action': {
					templateUrl: '/app/modules/worker/action/worker.action.view.html',
					controller: 'WorkersNewCtrl'
				}
			}
		})
		.state('main.workers.edit', {
			url: '/edit',
			views: {
				'action': {
					templateUrl: '/app/modules/worker/action/worker.action.view.html',
					controller: 'WorkersEditCtrl'
				}
			}
		})
		.state('main.workers.delete', {
			url: '/delete',
			views: {
				'action': {
					templateUrl: '/app/modules/worker/action/worker.action.delete.view.html',
					controller: 'WorkersDeleteCtrl'
				}
			}
		});

	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('WorkersService', function ($http) {

        var urlBase = '../data/worker/';

        this.getAll = function () {
            return $http.get(urlBase + 'workers.list.json');
        };

        this.get = function (id) {
            return $http.get(urlBase + id + '.json');
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

        this.searchByField = function (field, value) {
            return $http.get(urlBase + 'workers_search_' + field + '=' + value + '.json');
        };

        this.getPage = function (currentPage, size) {
            return $http.get(urlBase + 'workers_page=' + currentPage + '_size=' + size + '.json');
        };

    });

})();

(function () {
    'use strict';

    angular
    .module('main')
    .filter('phone', function () {
        return function (tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

            default:
            return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});

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

	function TableCtrl($scope, $state, $http, HotelsService) {  
		var sc = $scope;
		
    	sc.field = sc.tableHeader[0];

        sc.setField = function(field) {
            sc.field = field;
        }

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
	.controller('TranslateCtrl', TranslateCtrl);

	function TranslateCtrl ($scope, $translate) {
		var sc = $scope;
		
		$translate.use('en');

		sc.setLang = function(language) {
			$translate.use(language.toString());
			alert();
		};
		
	};
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

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomEditCtrl', RoomEditCtrl);

	function RoomEditCtrl ($scope, $state, $location, RoomsService) {
		var sc = $scope;
		sc.action = 'Edit';

		RoomsService.get(sc.id)
		.success(function (data) {
			sc.room = data;
			sc.roomType = sc.room.roomType;
			sc.numberOfRooms = sc.room.numberOfRooms;
			sc.typeOfBed = sc.room.typeOfBed;
			sc.breakfast = sc.room.breakfast;
			sc.price = sc.room.price;

			sc.save = function () {
				sc.room = {
					'room': sc.name,
					'roomType':sc.roomType,
					'numberOfRooms': sc.numberOfRooms,
					'typeOfBed': sc.typeOfBed,
					'breakfast': sc.breakfast,
					'price': sc.price
				}

				RoomsService.update(sc.id, sc.room)
				.success(function (data) {
					alert('updated!');
					sc.room = null;
				});
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomNewCtrl', RoomNewCtrl);

	function RoomNewCtrl ($scope, $state, $location, RoomsService) {
		var sc = $scope;
		sc.action = 'Edit';

		RoomsService.get(sc.id)
		.success(function (data) {
			sc.room = data;
			sc.roomType = sc.room.roomType;
			sc.numberOfRooms = sc.room.numberOfRooms;
			sc.typeOfBed = sc.room.typeOfBed;
			sc.breakfast = sc.room.breakfast;
			sc.price = sc.room.price;

			sc.save = function () {
				sc.room = {
					'room': sc.name,
					'roomType':sc.roomType,
					'numberOfRooms': sc.numberOfRooms,
					'typeOfBed': sc.typeOfBed,
					'breakfast': sc.breakfast,
					'price': sc.price
				}

				RoomsService.update(sc.id, sc.room)
				.success(function (data) {
					alert('updated!');
					sc.room = null;
				});
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomNewCtrl', RoomNewCtrl);

	function RoomNewCtrl ($scope, $state, $location, RoomsService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.roomType = null;
		sc.numberOfRooms = null;
		sc.typeOfBed = null;
		sc.breakfast = null;
		sc.price = null;


		sc.save = function () {
			sc.room = {
				'room': sc.name,
				'roomType':sc.roomType,
				'numberOfRooms': sc.numberOfRooms,
				'typeOfBed': sc.typeOfBed,
				'breakfast': sc.breakfast,
				'price': sc.price
			}

			RoomsService.new(sc.room)
			.success(function (data) {
				alert('added!');
				sc.room = null;
			});
		}
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomDeleteCtrl', RoomDeleteCtrl);

	function RoomDeleteCtrl ($scope, $state, $location, RoomsService) {
		var sc = $scope;

		sc.delete = function () {
			RoomsService.delete(sc.id)
			.success(function (data) {
				alert('deleted' + sc.id);
				sc.room = null;
			});
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersDeleteCtrl', WorkersDeleteCtrl);

	function WorkersDeleteCtrl ($scope, $state, $location, WorkersService) {
		var sc = $scope;

		sc.delete = function () {
			WorkersService.delete(sc.id)
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
	.controller('WorkersEditCtrl', WorkersEditCtrl);

	function WorkersEditCtrl ($scope, $state, $location, WorkersService) {
		var sc = $scope;
		sc.action = 'Edit';

		WorkersService.get(sc.id)
		.success(function (data) {
			sc.worker = data;

			sc.fullName = sc.worker.name;
			sc.position = sc.worker.position;
			sc.birthday = sc.worker.birthday;
			sc.age = sc.worker.age;
			sc.sex = sc.worker.sex;
			sc.experience = sc.worker.experience;
			sc.previousPosition = sc.worker.previousPosition;
			sc.date = sc.worker.date;

			sc.save = function () {
				sc.worker = {
					'fullName': sc.fullName,
					'position':sc.position,
					'birthday': sc.birthday,
					'age': sc.age,
					'sex': sc.sex,
					'experience': sc.experience,
					'previousPosition': sc.previousPosition,
					'date': sc.date,
				}

				WorkersService.update(sc.id, sc.worker)
				.success(function (data) {
					alert('updated!');
					sc.worker = null;
				});
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersNewCtrl', WorkersNewCtrl);

	function WorkersNewCtrl ($scope, $state, $location, WorkersService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.fullName = null;
		sc.position = null;
		sc.birthday = null;
		sc.age = null;
		sc.sex = null;
		sc.experience = null;
		sc.previousPosition = null;
		sc.date = null;

		
		sc.save = function () {
			sc.worker = {
				'fullName': sc.fullName,
				'position':sc.position,
				'birthday': sc.birthday,
				'age': sc.age,
				'sex': sc.sex,
				'experience': sc.experience,
				'previousPosition': sc.previousPosition,
				'date': sc.date,
			}

			WorkersService.new(sc.worker)
			.success(function (data) {
				alert('added!');
				sc.worker = null;
			});
		}
	};
})();
