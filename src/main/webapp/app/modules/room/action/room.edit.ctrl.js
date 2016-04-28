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
