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
