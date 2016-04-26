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
