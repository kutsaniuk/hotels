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
