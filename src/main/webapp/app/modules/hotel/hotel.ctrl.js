(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelCtrl', HotelCtrl);

	function HotelCtrl ($scope, $state, $http, $stateParams, ngDialog, HotelService) {
		var sc = $scope;

		sc.table = 'hotel';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[ 
		'name', 
		'city',
		'adress',
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

		sc.loadPage = function(currentPage, name, country) {
			if (name == '') name = null;
			if (country == '') country = null;
			
			HotelService.getPage(currentPage - 1, 10, name, country)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.loadPage(1); 
	};
})();
