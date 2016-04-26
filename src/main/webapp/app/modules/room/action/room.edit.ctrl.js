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
