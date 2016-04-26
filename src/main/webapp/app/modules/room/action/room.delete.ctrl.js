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
