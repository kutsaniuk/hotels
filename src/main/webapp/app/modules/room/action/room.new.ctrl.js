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
