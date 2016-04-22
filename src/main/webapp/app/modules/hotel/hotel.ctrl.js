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

		var hotelData = new Array();		

		for (var i = 0; i < 30; i ++) {
			
			hotelData[i] = "INSERT INTO hotels(name, city, address, full_director_name, email, Director_phone_number, order_phone_number)" +
  							"VALUES('hotel" + i + "', 'city" + i + "', 'adress" + i + "', 'full_director_name" + i + "', 'email@gmail.com', '0963254585', '0963254585');";
		};

		sc.hotelData = hotelData;
	};
})();
