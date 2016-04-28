(function () {
	'use strict';

	var main = angular.module('main', [
		'hotel',
		'room',
		'worker',
		'ui.router',
		'ui.bootstrap',
		'ngResource',
		'ngAnimate',
		'pascalprecht.translate',
		'base64',
		'flow',
		'checklist-model',
		'ngDialog',
		'uiSwitch',
		'sticky'
		])
	.config(configure).
	run(run);


	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider'];
	function configure ($stateProvider, $urlRouterProvider, $translateProvider) {

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

	function run($translate, $rootScope, $templateCache) {
		// $translate.use('en');
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelCtrl', HotelCtrl);

	function HotelCtrl ($scope, $state, $http, $stateParams, ngDialog, HotelService) {
		var sc = $scope;

		sc.hotelInfoSwitchShow = false;

		sc.table = 'hotel';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[ 
		'name', 
		'city',
		'fullDirectorName',
		'email',
		'directorPhoneNumber',
		'orderPhoneNumber'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/hotel/action/hotel.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'HotelEditCtrl',
				scope: $scope
			});
			sc.id = id; 
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/hotel/action/hotel.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'HotelNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/hotel/action/hotel.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'HotelDeleteCtrl',
				scope: $scope
			});
		};

		sc.getLogoById = function (id) {
	  		HotelService.getLogo(id)
	  		.success( function (data) {
	  			data.logo;
	  		});
	  	}

		sc.loadPage = function(currentPage, name, city) {
			if (name == '') name = null;
			if (city == '') city = null;
			
			HotelService.getPage(currentPage - 1, 9, name, city)
			.success(function (data){
				sc.main = data;
			});

			sc.name = name;
			sc.city = city;
		};

		sc.loadPage(1); 
	};
})();

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

(function () {
    'use strict';

    angular.module('main')
    .service('HotelService', function ($http) {

        var urlBase = '/hotel';

        this.getAll = function () {
            return $http.get(urlBase, { 
                    params: { 
                        page: 0, 
                        size: 1000
                    }
                });
        };  

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (dev) {
            return $http.post(urlBase, dev);
        };

        this.update = function (dev) {
            return $http.put(urlBase, dev)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, name, city) {
            return $http.get(urlBase, { 
                    params: { 
                        name: name,
                        city: city,
                        page: currentPage, 
                        size: size 
                    }
            }); 
        };

        this.getLogo = function (id) {
            return $http.get(urlBase + '/logo', { 
                    params: { 
                        id: id
                    }
            });
        }

        this.getImages = function (id) {
            return $http.get(urlBase + '/images', { 
                    params: { 
                        id: id
                    }
            });
        }
    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomCtrl', RoomCtrl);

	function RoomCtrl($scope, $state, RoomService, ngDialog) {
		var sc = $scope;
  
		sc.table = 'room';
		sc.base = '/' + sc.table;

		sc.currentDate = new Date().getFullYear();

		sc.getAge = function () {
			if (sc.birthday != '') alert(sc.birthday);
			else sc.age = null;
		}

		sc.tableHeader = 
		[
		'roomType', 
		'roomCount',
		'bedType',
		'breakfast'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/room/action/room.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'RoomEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/room/action/room.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'RoomNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id;
			ngDialog.open({ 
				template: '/app/modules/room/action/room.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'RoomDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, roomType, bedType, breakfast) {

			RoomService.getPage(currentPage - 1, 10, roomType, bedType, breakfast)
				.success(function (data){
					sc.main = data;
				});

			sc.roomType = roomType;
			sc.bedType = bedType;
			sc.breakfast = breakfast;
			sc.currentPage = currentPage;
		};

		sc.loadPage(1); 
	};

})();

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

(function () {
    'use strict';

    angular.module('main')
    .service('RoomService', function ($http) {

        var urlBase = '/room';

        this.getAll = function () {
            return $http.get(urlBase); 
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (room) {
            return $http.post(urlBase, room);
        };

        this.update = function (room) {
            return $http.put(urlBase, room)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, roomType, bedType, breakfast) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size,
                        roomType: roomType,
                        bedType: bedType,
                        breakfast: breakfast
                    }
            });
        };

    });

})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerCtrl', WorkerCtrl);

	function WorkerCtrl ($scope, $state, WorkerService, HotelService, RoomService, ngDialog) {
		var sc = $scope;
		
		sc.table = 'worker';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'fullName', 
		'post',
		'birthday',
		'sex',
		'experience',
		'previousPost',
		'dateOfEmployment'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/worker/action/worker.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'WorkerEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/worker/action/worker.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'WorkerNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/worker/action/worker.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'WorkerDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, fullName, post, date) {
			if (date != null) {
				var date = new Date(date);
				date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			}

			WorkerService.getPage(currentPage - 1, 10, fullName, post, date)
				.success(function (data){
					sc.main = data;
				});

			sc.fullName = fullName;
			sc.post = post;
			sc.date = date;
			sc.currentPage = currentPage;
		};

		sc.devName = {};
		sc.licName = {};

		HotelService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		RoomService.getAll().success( function (data) {
			sc.licensies = data.content;
		});

		sc.loadPage(1); 
	};

})();

(function () {
	'use strict';

	var worker = angular.module('worker', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.worker', {
			url: 'worker',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.worker.table', {
			url: '', 
			views: {
				'content@main.worker': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'WorkerCtrl',
				},
				'filter@main.worker.table': {
					templateUrl: '/app/modules/worker/filter/worker.filter.view.html'
				}
			}
		})
		.state('main.worker.profile', { 
			url: '/:id',
			views: {
				'content@main.worker': {
					templateUrl: '/app/modules/worker/profile/worker.profile.view.html',
					controller: 'WorkerProfileCtrl'
				}
			}
		});
	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('WorkerService', function ($http) {

        var urlBase = '/worker';

        this.getAll = function () {
            return $http.get(urlBase, { 
                    params: { 
                        page: 0, 
                        size: 1000
                    }
                });
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (worker) {
            return $http.post(urlBase, worker);
        };

        this.update = function (worker) {
            return $http.put(urlBase, worker)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, fullName, post, date) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size,
                        fullName: fullName,
                        post: post,
                        date: date
                    }
            });
        };

        this.getLogo = function (id) {
            return $http.get(urlBase + '/logo', { 
                    params: { 
                        id: id
                    }
            });
        }

        this.deleteImageById = function (id) {
            return $http.delete(urlBase + '/images', { 
                    params: { 
                        id: id
                    }
            });
        }

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

	function TableCtrl($scope, $state, $http) {  
		var sc = $scope;
		
    	sc.field = sc.tableHeader[0];

        sc.setField = function(field) {
            sc.field = field;
        }

        //Sort 
        sc.fieldName = undefined;
        sc.reverse = false;

        sc.sort = function(fieldName) {
            sc.reverse = (sc.fieldName === fieldName) ? !sc.reverse:false;
            sc.fieldName = fieldName;
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
	.controller('HotelDeleteCtrl', HotelDeleteCtrl);

	function HotelDeleteCtrl ($scope, $state, $location, HotelService) {
		var sc = $scope;
		var hotelName;

		HotelService.get(sc.id)
	  		.success( function (data) {
	  			hotelName = data.name;
				sc.log = 'Are you sure you want to remove hotel ' + hotelName + '?';
	  		});

		sc.delete = function () {
			HotelService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(1);
			  }, function errorCallback(response) {
			    	sc.log = 'Hotel "' + hotelName + '" could not be deleted because is in use yet';
			  }); 
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelEditCtrl', HotelEditCtrl);

	function HotelEditCtrl ($scope, $state, $location, HotelService) {
		var sc = $scope;

		sc.action = 'edit';

		sc.formValid = false;

		sc.target = { 
				target: '/dev/logo?id=' + sc.id,
				testChunks: false,
				singleFile: true
			};

		sc.name = '';
        sc.city = '';
        sc.address = '';
        sc.fullDirectorName = '';
        sc.email = '';
        sc.directorPhoneNumber = '';
        sc.orderPhoneNumber = '';

		HotelService.get(sc.id)
		.success(function (data) {
			sc.hotel = data; 

			sc.id = sc.hotel.id;
			sc.name = sc.hotel.name;
			sc.city = sc.hotel.city;
			sc.address = sc.hotel.address;
			sc.fullDirectorName = sc.hotel.fullDirectorName;
			sc.email = sc.hotel.email;
			sc.directorPhoneNumber = sc.hotel.directorPhoneNumber;
			sc.orderPhoneNumber = sc.hotel.orderPhoneNumber;

			sc.checkForm = function () {
	            if (sc.name != '' 
	                && sc.city != '' 
	                && sc.address != '' 
	                && sc.fullDirectorName != '' 
	                && sc.email != '' 
	                && sc.directorPhoneNumber != '' 
	                && sc.orderPhoneNumber != '' 
	                && sc.hotelForm.$valid
	            ) sc.formValid = true;
	            else sc.formValid = false;
	        }
 
			sc.save = function () {
				sc.hotel = {
					'id': sc.id,
					'name': sc.name,
	                'city': sc.city,
	                'address': sc.address,
	                'fullDirectorName': sc.fullDirectorName,
	                'email': sc.email,
	                'directorPhoneNumber': sc.directorPhoneNumber,
	                'orderPhoneNumber': sc.orderPhoneNumber
				}

                if (sc.formValid) HotelService.update(sc.hotel)
					.success(function() {
					    sc.closeThisDialog(true);
					    sc.loadPage(sc.currentPage);
					});
			}
		});
	}
})();

(function() {
    'use strict';

    angular
    .module('main')
    .controller('HotelNewCtrl', HotelNewCtrl);

    function HotelNewCtrl($scope, $state, $location, $document, HotelService, RoomService, ngDialog) {
        var sc = $scope;

        sc.action = 'add';
        sc.formValid = false;

        sc.name = '';
        sc.city = '';
        sc.address = '';
        sc.fullDirectorName = '';
        sc.email = '';
        sc.directorPhoneNumber = '';
        sc.orderPhoneNumber = '';

        sc.rooms = [];
        
        RoomService.getAll()
            .success(function (data){
                sc.main = data;

            }); 

        sc.checkForm = function () {
            if (sc.name != '' 
                && sc.city != '' 
                && sc.address != '' 
                && sc.fullDirectorName != '' 
                && sc.email != '' 
                && sc.directorPhoneNumber != '' 
                && sc.orderPhoneNumber != '' 
                && sc.hotelForm.$valid
            ) sc.formValid = true;
            else sc.formValid = false;
        }

        sc.openRoomAdd = function () {
            ngDialog.open({ 
                template: '/app/modules/hotel/action/hotel.action.new.room.view.html', 
                className: 'ngdialog-theme-dev',
                showClose: false,
                scope: $scope,
                disableAnimation: true
            });
        };

        sc.cancelRoomAdd = function () {
            sc.rooms = [];
        }

        sc.save = function() {
            sc.hotel = {
                'name': sc.name,
                'city': sc.city,
                'address': sc.address,
                'fullDirectorName': sc.fullDirectorName,
                'email': sc.email,
                'directorPhoneNumber': sc.directorPhoneNumber,
                'orderPhoneNumber': sc.orderPhoneNumber

                // 'rooms': {"id": 6, "roomType": "PRESIDENT", "roomCount": 5, "bedType": false, "breakfast": true},
                // 'workers': {"id":5,"fullName":"worker5","post":"post5","birthday":"1996-11-08","sex":"MALE","experience":10,"previousPost":"previous_post5","dateOfEmployment":"2010-12-05"}
            };

            if (sc.formValid) HotelService.new(sc.hotel)
				.success(function() {
				    sc.loadPage(sc.currentPage);
                    sc.closeThisDialog(true);
				});
        };

    };
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelProfileCtrl', HotelProfileCtrl);

	function HotelProfileCtrl ($scope, $state, $stateParams, ngDialog, HotelService, WorkerService, RoomService) {
		var sc = $scope;
		sc.table = 'hotel';

		sc.id = $stateParams.id;

		sc.targetLogo = { 
				target: '/hotel/logo?id=' + $stateParams.id,
				testChunks: false,
				singleFile: true
			};

		sc.targetImages = { 
				target: '/hotel/images?id=1' + $stateParams.id,
				testChunks: false
			};

		HotelService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  			sc.hotel = data;
	  		});

	  	WorkerService.getAll()
	  		.success( function (data) {
	  			sc.workers = data.content;
	  		});

	  	RoomService.getAll()
	  		.success( function (data) {
	  			sc.rooms = data.content;
	  		});

	  	sc.getLogoById = function (id) {
	  		HotelService.getLogo(id)
	  		.success( function (data) {
	  			sc.hotelLogo = data;
	  		});
	  	}

	  	sc.getImages = function (id) {
	  		HotelService.getImages(id)
	  		.success( function (data) {
	  			sc.images = data;
	  		});
	  	}

	  	sc.openLogoUpload = function () {
	  		ngDialog.open({ 
				template: '/app/modules/hotel/profile/hotel.logo.upload.view.html', 
				className: 'ngdialog-theme-default',
				showClose: true,
				scope: $scope
			});
	  	}

	  	sc.openImageById = function (index) {
			ngDialog.open({ 
				template: '/app/shared/image/image.fullsreen.view.html', 
				className: 'ngdialog-theme-image-view',
				showClose: false,
				scope: $scope
			});
			sc.imgIndex = index;
		};

		sc.openWorkers = function () {
			ngDialog.open({ 
				template: '/app/modules/hotel/profile/hotel.worker.view.html',
				className: 'ngdialog-theme-dev',
				showClose: false,
				scope: $scope,
				disableAnimation: true
			});
		};

		sc.previousImage = function () {
			if (sc.imgIndex == 0) sc.imgIndex = sc.images.length;
			sc.imgIndex --;
		}

		sc.nextImage = function () {
			sc.imgIndex ++;
			if (sc.imgIndex == sc.images.length) sc.imgIndex = 0;
		}

	  	sc.getLogoById(sc.id);

	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomDeleteCtrl', RoomDeleteCtrl);

	function RoomDeleteCtrl ($scope, $state, $location, RoomService) {
		var sc = $scope;
		var roomName;

		RoomService.get(sc.id)
	  		.success( function (data) {
	  			roomName = data.roomType;
				sc.log = 'Are you sure you want to remove room ' + roomName + '?';
	  		});

		sc.delete = function () {
			RoomService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(sc.currentPage);
			  }, function errorCallback(response) {
			    	sc.log = 'Room "'+ roomName +'" could not be deleted because is in use yet';
			  }); 

		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomEditCtrl', RoomEditCtrl);

	function RoomEditCtrl ($scope, $state, $location, RoomService, HotelService) {
		var sc = $scope;
		sc.action = 'edit';

		RoomService.get(sc.id)
		.success(function (data) {
			sc.room = data;

			sc.id = sc.room.id;
			sc.roomType = sc.room.roomType;
			sc.roomCount = sc.room.roomCount;
			sc.bedType = sc.room.bedType;
			sc.breakfast = sc.room.breakfast;
			sc.hotel = sc.room.hotel;

			sc.selHotel = sc.room.hotel;

			HotelService.getAll().success( function (data) {
				sc.hotels = data.content;
			}); 

			sc.checkForm = function () {
	            if (sc.roomType != '' 
					&& sc.roomCount != ''
					&& sc.roomCount != null
					&& sc.bedType != ''
					&& sc.selHotel != ''
	                && sc.roomForm.$valid
	            ) sc.formValid = true;
	            else sc.formValid = false;
	        }

			sc.save = function () {
				sc.room = {
					'id': sc.id,
					'roomType': sc.roomType,
					'roomCount': sc.roomCount,
					'bedType': sc.bedType,
					'breakfast': sc.breakfast,
					'hotel': sc.selHotel
				}

				if (sc.formValid) RoomService.update(sc.room)
				.success(function (data) {
					sc.room = null;
					sc.closeThisDialog(true);
					sc.loadPage(sc.currentPage);
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

	function RoomNewCtrl ($scope, $state, $location, RoomService, HotelService) {
		var sc = $scope;

		sc.action = 'add';
		sc.formValid = false;

		sc.roomType = '';
		sc.roomCount = '';
		sc.bedType = '';
		sc.breakfast = true;

		sc.selHotel = '';

		HotelService.getAll().success( function (data) {
			sc.hotels = data.content;
		});

		sc.checkForm = function () {
            if (sc.roomType != '' 
				&& sc.roomCount != ''
				&& sc.roomCount != null
				&& sc.bedType != ''
				&& sc.selHotel != ''
                && sc.roomForm.$valid
            ) sc.formValid = true;
            else sc.formValid = false;
        }
		
		sc.save = function () {
			sc.room = {
				'roomType': sc.roomType,
				'roomCount': sc.roomCount,
				'bedType': sc.bedType,
				'breakfast': sc.breakfast,
				'hotel': sc.selHotel
			}

			if (sc.formValid) RoomService.new(sc.room)
			.success(function (data) {
				sc.loadPage(sc.currentPage);
				sc.room = null;
				sc.closeThisDialog(true);
			});
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerDeleteCtrl', WorkerDeleteCtrl);

	function WorkerDeleteCtrl ($scope, $state, $location, WorkerService) {
		var sc = $scope;

		sc.delete = function () {
			WorkerService.delete(sc.id)
			.success(function (data) {
				sc.loadPage(1);
				sc.closeThisDialog(true);
			});
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerEditCtrl', WorkerEditCtrl);

	function WorkerEditCtrl ($scope, $state, $location, WorkerService, HotelService, RoomService) {
		var sc = $scope;

		sc.action = 'edit';
        sc.formValid = false;

		WorkerService.get(sc.id)
		.success(function (data) {
			sc.worker = data;

			sc.id = sc.worker.id;
			sc.fullName = sc.worker.fullName;
			sc.post = sc.worker.post;
			sc.birthday = new Date(sc.worker.birthday);
			sc.sex = sc.worker.sex;
			sc.experience = sc.worker.experience;
			sc.previousPost = sc.worker.previousPost;
			sc.dateOfEmployment = new Date(sc.worker.dateOfEmployment);

			sc.selHotel = sc.worker.hotel;

			HotelService.getAll().success( function (data) {
				sc.hotels = data.content;
			});

			sc.checkForm = function () {
	            if (sc.fullName != '' 
					&& sc.post != ''
					&& sc.birthday != ''
					&& sc.sex != ''
					&& sc.experience != ''
					&& sc.experience != null
					&& sc.previousPost != ''
					&& sc.dateOfEmployment != ''
					&& sc.selHotel != ''
	                && sc.workerForm.$valid
	            ) sc.formValid = true;
	            else sc.formValid = false;
	        }

			sc.save = function () {
				sc.soft = {
					'id': sc.id,
					'fullName': sc.fullName,
					'post': sc.post,
					'birthday': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate(),
					'sex': sc.sex,
					'experience': sc.experience,
					'previousPost': sc.previousPost,
					'dateOfEmployment': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate(),
					'hotel': sc.selHotel
				}

				if (sc.formValid) WorkerService.update(sc.soft)
					.success(function (data) {
						sc.loadPage(sc.currentPage);
						sc.closeThisDialog(true);
					});
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerNewCtrl', WorkerNewCtrl);

	function WorkerNewCtrl ($scope, $state, $location, WorkerService, HotelService) {
		var sc = $scope;

		sc.action = 'add';
        sc.formValid = false;

		sc.fullName = '';
        sc.post = '';
        sc.birthday = new Date();
        sc.sex = '';
        sc.experience = '';
        sc.previousPost = '';
        sc.dateOfEmployment = new Date();
        sc.selHotel = { id: ''};

		HotelService.getAll().success( function (data) {
			sc.hotels = data.content;
		});

		sc.checkForm = function () {
            if (sc.fullName != '' 
				&& sc.post != ''
				&& sc.birthday != ''
				&& sc.sex != ''
				&& sc.experience != ''
				&& sc.experience != null
				&& sc.previousPost != ''
				&& sc.dateOfEmployment != ''
				&& sc.selHotel != ''
                && sc.workerForm.$valid
            ) sc.formValid = true;
            else sc.formValid = false;
        }

		sc.save = function () {

			sc.worker = {
				'fullName': sc.fullName,
				'post': sc.post,
				'birthday': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate(),
				'sex': sc.sex,
				'experience': sc.experience,
				'previousPost': sc.previousPost,
				'dateOfEmployment': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate(),
				'hotel': sc.selHotel
			}

			if (sc.formValid) WorkerService.new(sc.worker)
				.success(function (data) {
					sc.loadPage(sc.currentPage);
					sc.closeThisDialog(true);
				});
		}
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerProfileCtrl', WorkerProfileCtrl);

	function WorkerProfileCtrl ($scope, $state, $stateParams, WorkerService, HotelService, ngDialog) {
		var sc = $scope;
		sc.table = 'worker';
		sc.imgIndex = 0;

		sc.id = $stateParams.id;

		sc.target = { 
				target: '/worker/logo?id=' + $stateParams.id,
				testChunks: false
			};

		sc.getLogo = function (id) {
			WorkerService.getLogo(id)
		  		.success( function (data) { 
		  			sc.logo = data.logo;
		  		});
		}

		sc.getImageId = function (index) {
			return sc.images[sc.imgIndex].id;
		}
 
		WorkerService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;

	  			HotelService.getLogo(data.hotel.id)
			  		.success( function (data) {
			  			sc.hotelLogo = '';
			  			sc.hotelLogo = data;
			  		});

			  	sc.getLogo(sc.id);
	  		});

	  	sc.getImages = function () {
	  		WorkerService.getImages($stateParams.id)
	  		.success( function (data) {
	  			sc.images = data;
				if (sc.images != '') sc.currentImage = sc.images[0].image;
	  		});	  	
	  	}

	  	sc.openImageById = function (index) {
			ngDialog.open({ 
				template: '/app/shared/image/image.fullsreen.view.html', 
				className: 'ngdialog-theme-image-view',
				showClose: false,
				scope: $scope
			});
			sc.imgIndex = index;
		};

		sc.deleteImage = function (id) {
			WorkerService.deleteImageById(id).success( function (data) {
	  			sc.getImages();
	  		});	 
		}

		sc.previousImage = function () {
			if (sc.imgIndex == 0) sc.imgIndex = sc.images.length;
			sc.imgIndex --;
		}

		sc.nextImage = function () {
			sc.imgIndex ++;
			if (sc.imgIndex == sc.images.length) sc.imgIndex = 0;
		}

		sc.openWorkers = function () {
			ngDialog.open({ 
				template: '/app/shared/image/image.fullsreen.view.html', 
				className: 'ngdialog-theme-image-view',
				showClose: false,
				scope: $scope
			});
		};
	};
})();

(function() {
    'use strict';

    angular
    .module('main')
    .controller('HotelAddRoomCtrl', HotelAddRoomCtrl);

    function HotelAddRoomCtrl($scope, $state, $location, $document, RoomService) {
        var sc = $scope;

        

        sc.save = function() {}
          

    };
})();
