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

		HotelService.get(sc.id)
		.success(function (data) {
			sc.hotel = data;

			sc.id = sc.hotel.id;
			sc.name = sc.hotel.name;
			sc.country = sc.hotel.country;
			sc.city = sc.hotel.city;
			sc.street = sc.hotel.street;
			sc.email = sc.hotel.email;
			sc.zipcode = sc.hotel.zipcode;
			sc.website = sc.hotel.website;
			sc.phoneNumber = sc.hotel.phoneNumber;
			sc.fax = sc.hotel.fax;
 
			sc.save = function () {
				sc.hotel = {
					'id': sc.id,
					'name': document.getElementById('name').value,
					'country': sc.country,
					'city': sc.city,
					'street': sc.street,
					'email': sc.email,
					'zipcode': sc.zipcode,
					'website': sc.website,
					'phoneNumber': sc.phoneNumber,
					'fax': sc.fax 
				}

				if (sc.name != '' 
	            	&& sc.country != '' 
	            	&& sc.city != '' 
	            	&& sc.street != '' 
	            	&& sc.email != '' 
	            	&& sc.zipcode != '' 
	            	&& sc.website != '' 
	            	&& sc.phoneNumber != ''
	            	&& sc.fax != ''
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
