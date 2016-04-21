(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelDeleteCtrl', HotelDeleteCtrl);

	function HotelDeleteCtrl ($scope, $state, $location, HotelService) {
		var sc = $scope;
		var hotelName;

		HotelService.get(sc.id)
	  		.success( function (data) {
	  			hotelName = data.name;
				sc.log = 'Are you sure you want to remove hotel ' + hotelName + '?';
	  		});

		sc.delete = function () {
			HotelService.delete(sc.id)
			.then(function successCallback(response) {
				sc.closeThisDialog(true);
				sc.loadPage(1);
			  }, function errorCallback(response) {
			    	sc.log = 'Hotel "' + hotelName + '" could not be deleted because is in use yet';
			  }); 
		}
	};
})();
