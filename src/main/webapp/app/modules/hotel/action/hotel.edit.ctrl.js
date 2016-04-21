(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelEditCtrl', HotelEditCtrl);

	function HotelEditCtrl ($scope, $state, $location, HotelService) {
		var sc = $scope;

		sc.action = 'edit';

		sc.target = { 
				target: '/dev/logo?id=' + sc.id,
				testChunks: false,
				singleFile: true
			};

		sc.name = '';
        sc.city = '';
        sc.address = '';
        sc.fullDirectorName = '';
        sc.email = '';
        sc.directorPhoneNumber = '';
        sc.orderPhoneNumber = '';

		HotelService.get(sc.id)
		.success(function (data) {
			sc.hotel = data;

			sc.id = sc.hotel.id;
			sc.name = sc.hotel.name;
			sc.city = sc.hotel.city;
			sc.address = sc.hotel.country;
			sc.fullDirectorName = sc.hotel.fullDirectorName;
			sc.email = sc.hotel.email;
			sc.directorPhoneNumber = sc.hotel.directorPhoneNumber;
			sc.orderPhoneNumber = sc.hotel.orderPhoneNumber;
 
			sc.save = function () {
				sc.hotel = {
					'id': sc.id,
					'name': sc.name,
	                'city': sc.city,
	                'address': sc.address,
	                'fullDirectorName': sc.fullDirectorName,
	                'email': sc.email,
	                'directorPhoneNumber': sc.directorPhoneNumber,
	                'orderPhoneNumber': sc.orderPhoneNumber
				}

				if (sc.name != '' 
	            	&& sc.city != '' 
	            	&& sc.address != '' 
	            	&& sc.fullDirectorName != '' 
	            	&& sc.email != '' 
	            	&& sc.directorPhoneNumber != '' 
	            	&& sc.orderPhoneNumber != '' 
	            ) {
	                HotelService.update(sc.hotel)
						.success(function() {
						    sc.closeThisDialog(true);
						    sc.loadPage(1);
						});
            	} else alert('Error');
			}
		});
	}
})();
