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

			sc.checkForm = function () {
	            if (sc.roomType != '' 
					&& sc.roomCount != ''
					&& sc.roomCount != null
					&& sc.bedType != ''
					&& sc.breakfast != ''
	                && sc.roomForm.$valid
	            ) sc.formValid = true;
	            else sc.formValid = false;
	        }

			sc.save = function () {
				sc.room = {
					'roomType': sc.roomType,
					'roomCount': sc.roomCount,
					'bedType': true,
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
