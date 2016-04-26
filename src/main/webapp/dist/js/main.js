(function () {
	'use strict';

	var main = angular.module('main', [
		'hotel',
		'room',
		'software',
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
		'address',
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
			url: '',
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
			url: '/table',
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

        this.uploadImage = function (file, id) {
            var fd = new FormData();
            fd.append('file', file);

            return $http.post(urlBase + '/upload', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined },
                params: { id: id }
            });
        }

        this.getLogo = function (id) {
            return $http.get(urlBase + '/logo', { 
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
	.controller('SoftwareCtrl', SoftwareCtrl);

	function SoftwareCtrl ($scope, $state, SoftwareService, DeveloperService, LicenseService, ngDialog) {
		var sc = $scope;
		
		sc.table = 'software';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'version',
		'release',
		'developer',
		'license',
		'windows',
		'linux',
		'macOS'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/software/action/software.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'SoftwareEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/software/action/software.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'SoftwareNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/software/action/software.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'SoftwareDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, name, release, devName, licName) {
			if (release != null) {
				var date = new Date(release);
				release = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			}

			SoftwareService.getPage(currentPage - 1, 10, name, release, devName, licName)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.devName = {};
		sc.licName = {};

		DeveloperService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		LicenseService.getAll().success( function (data) {
			sc.licensies = data.content;
		});

		sc.loadPage(1); 
	};

})();

(function () {
	'use strict';

	var software = angular.module('software', [
		'ui.router'
		])
	.config(configure);


	configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
	function configure($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('main.software', {
			url: 'software',
			abstract: true,
			template: '<div ui-view="content"></div>'
		})
		.state('main.software.table', {
			url: '', 
			views: {
				'content@main.software': {
					templateUrl: '/app/shared/table/table.view.html',
					controller: 'SoftwareCtrl',
				},
				'filter@main.software.table': {
					templateUrl: '/app/modules/software/filter/software.filter.view.html'
				}
			}
		})
		.state('main.software.profile', { 
			url: '/:id',
			views: {
				'content@main.software': {
					templateUrl: '/app/modules/software/profile/software.profile.view.html',
					controller: 'SoftwareProfileCtrl'
				}
			}
		});
	}

})();

(function () {
    'use strict';

    angular.module('main')
    .service('SoftwareService', function ($http) {

        var urlBase = '/soft';

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

        this.new = function (software) {
            return $http.post(urlBase, software);
        };

        this.update = function (software) {
            return $http.put(urlBase, software)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, name, release, devName, licName) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size,
                        name: name,
                        release: release,
                        devName: devName,
                        licName: licName
                    }
            });
        };

        this.getImages = function (id) {
            return $http.get(urlBase + '/images', { 
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
			sc.address = sc.hotel.country;
			sc.fullDirectorName = sc.hotel.fullDirectorName;
			sc.email = sc.hotel.email;
			sc.directorPhoneNumber = sc.hotel.directorPhoneNumber;
			sc.orderPhoneNumber = sc.hotel.orderPhoneNumber;
 
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

				if (sc.name != '' 
	            	&& sc.city != '' 
	            	&& sc.address != '' 
	            	&& sc.fullDirectorName != '' 
	            	&& sc.email != '' 
	            	&& sc.directorPhoneNumber != '' 
	            	&& sc.orderPhoneNumber != '' 
	            ) {
	                HotelService.update(sc.hotel)
						.success(function() {
						    sc.closeThisDialog(true);
						    sc.loadPage(1);
						});
            	} else alert('Error');
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
        sc.formNullShow = false;

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
                'orderPhoneNumber': sc.orderPhoneNumber,
                'rooms': {"id": 6, "roomType": "PRESIDENT", "roomCount": 5, "bedType": false, "breakfast": true},
                'workers': {"id":5,"fullName":"worker5","post":"post5","birthday":"1996-11-08","sex":"MALE","experience":10,"previousPost":"previous_post5","dateOfEmployment":"2010-12-05"}
            };


            if (sc.name != '' 
                && sc.city != '' 
            	&& sc.address != '' 
            	&& sc.fullDirectorName != '' 
            	&& sc.email != '' 
            	&& sc.directorPhoneNumber != '' 
            	&& sc.orderPhoneNumber != '' 
                && sc.hotelForm.$valid
            ) {
                HotelService.new(sc.hotel)
					.success(function() {
					    sc.closeThisDialog(true);
                        sc.formNullShow = false;
					    sc.loadPage(1);
					});
            } else sc.formNullShow = true;
        };

    };
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelProfileCtrl', HotelProfileCtrl);

	function HotelProfileCtrl ($scope, $state, $stateParams, ngDialog, HotelService) {
		var sc = $scope;
		sc.table = 'hotel';

		sc.id = $stateParams.id;

		sc.target = { 
				target: '/hotel/logo?id=' + $stateParams.id,
				testChunks: false,
				singleFile: true
			};

		HotelService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  		});

	  	sc.getLogoById = function (id) {
	  		HotelService.getLogo(id)
	  		.success( function (data) {
	  			sc.devLogo = '';
	  			sc.devLogo = data;
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
		var licName;

		RoomService.get(sc.id)
	  		.success( function (data) {
	  			licName = data.name;
				sc.log = 'Are you sure you want to remove sicense ' + licName + '?';
	  		});

		sc.delete = function () {
			RoomService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(1);
			  }, function errorCallback(response) {
			    	sc.log = 'License "'+ licName +'" could not be deleted because is in use yet';
			  }); 

		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomEditCtrl', RoomEditCtrl);

	function RoomEditCtrl ($scope, $state, $location, RoomService) {
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

			sc.save = function () {
				sc.room = {
					'roomType': sc.roomType,
					'roomCount': sc.roomCount,
					'bedType': true,
					'breakfast': sc.breakfast,
					'hotel': sc.selHotel
				}

				if (sc.roomType != '' 
				&& sc.roomCount != ''
				&& sc.bedType != ''
				&& sc.breakfast != ''
				) {
					RoomService.update(sc.room)
					.success(function (data) {
						sc.room = null;
						sc.closeThisDialog(true);
						sc.loadPage(1);
					});
				}
				else alert('Error');
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

		sc.roomType = '';
		sc.roomCount = '';
		sc.bedType = '';
		sc.breakfast = '';

		sc.selHotel = '';

		HotelService.getAll().success( function (data) {
			sc.hotels = data.content;
		});
		
		sc.save = function () {
			sc.room = {
				'roomType': sc.roomType,
				'roomCount': sc.roomCount,
				'bedType': true,
				'breakfast': sc.breakfast,
				'hotel': sc.selHotel.id
			}

			if (sc.roomType != '' 
				&& sc.roomCount != ''
				&& sc.bedType != ''
				&& sc.breakfast != ''
				) {
				RoomService.new(sc.room)
				.success(function (data) {
					sc.room = null;
					sc.closeThisDialog(true);
					sc.loadPage(1);
				});
			}
			else alert('Error');
		}
	};
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareDeleteCtrl', SoftwareDeleteCtrl);

	function SoftwareDeleteCtrl ($scope, $state, $location, SoftwareService) {
		var sc = $scope;

		sc.delete = function () {
			SoftwareService.delete(sc.id)
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
	.controller('SoftwareEditCtrl', SoftwareEditCtrl);

	function SoftwareEditCtrl ($scope, $state, $location, SoftwareService, DeveloperService, LicenseService) {
		var sc = $scope;

		sc.action = 'Edit';

		SoftwareService.get(sc.id)
		.success(function (data) {
			sc.software = data;

			sc.id = sc.software.id;
			sc.name = sc.software.name;
			sc.version = sc.software.version;
			sc.releaseValue = sc.software.release;
			sc.license = sc.software.license;
			sc.developer = sc.software.developer;
			sc.windows = sc.software.windows;
			sc.linux = sc.software.linux;
			sc.macOS = sc.software.macOS;

			sc.release = new Date(sc.software.release);

			sc.selDeveloper = sc.software.developer;
			sc.selLicense = sc.software.license;

			DeveloperService.getAll().success( function (data) {
				sc.developers = data.content;
			});

			LicenseService.getAll().success( function (data) {
				sc.licensies = data.content;
			});

			sc.save = function () {
				sc.soft = {
					'id': sc.id,
					'name': sc.name,
					'version': sc.version,
					'release': sc.release.getFullYear() + '-' + (sc.release.getMonth() + 1) + '-' + sc.release.getDate(),
					'license': sc.selLicense,
					'developer': sc.selDeveloper,
					'windows': sc.windows,
					'linux': sc.linux,
					'macOS': sc.macOS
				}


			if (sc.name != '' 
				&& sc.version != ''
				&& sc.selDeveloper != {}
				&& sc.selLicense != {}
				) {
					SoftwareService.update(sc.soft)
					.success(function (data) {
						sc.loadPage(1);
						sc.soft = null;
					});
					sc.closeThisDialog(true);
				}
			else alert('Error');
			}
		});
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareNewCtrl', SoftwareNewCtrl);

	function SoftwareNewCtrl ($scope, $state, $location, SoftwareService, DeveloperService, LicenseService) {
		var sc = $scope;

		sc.action = 'Add';

		sc.name = '';
		sc.version = '';
		sc.release = new Date();
		sc.license = '';
		sc.windows = false;
		sc.linux = false;
		sc.macOS = false;
		sc.selDeveloper = '';
		sc.selLicense = '';

		DeveloperService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		LicenseService.getAll().success( function (data) {
			sc.licensies = data.content;
		});

		sc.save = function () {

			sc.soft = {
				'name': sc.name,
				'version': sc.version,
				'license': sc.selLicense,
				'developer': sc.selDeveloper,
				'release': sc.release.getFullYear() + '-' + sc.release.getMonth() + '-' + sc.release.getDate(),
				'windows': sc.windows,
				'linux': sc.linux,
				'macOS': sc.macOS
			}

		if (sc.name != '' 
			&& sc.version != ''
				&& sc.selLicense != ''
				&& sc.selDeveloper != ''
				) {
				SoftwareService.new(sc.soft)
				.success(function (data) {
					sc.loadPage(1);
					sc.soft = null;
					sc.closeThisDialog(true);
				});
			}
			else alert('Error');
		}
	}
})();

(function () {
	'use strict';

	angular
	.module('main')
	.controller('SoftwareProfileCtrl', SoftwareProfileCtrl);

	function SoftwareProfileCtrl ($scope, $state, $stateParams, SoftwareService, DeveloperService, ngDialog) {
		var sc = $scope;
		sc.table = 'software';
		sc.imgIndex = 0;

		sc.target = { 
				target: '/soft/images?id=' + $stateParams.id,
				testChunks: false
			};

		sc.getImage = function (index) {
			sc.imgIndex = index;
		}

		sc.getImageId = function (index) {
			return sc.images[sc.imgIndex].id;
		}
 
		SoftwareService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;

	  			DeveloperService.getLogo(data.developer.id)
	  			.success( function (data) {
	  				sc.devLogo = data.logo;
	  			});
	  		});

	  	sc.getImages = function () {
	  		SoftwareService.getImages($stateParams.id)
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
			SoftwareService.deleteImageById(id).success( function (data) {
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

	  	sc.getImages();
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
