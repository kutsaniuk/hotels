(function() {
    'use strict';

    angular
    .module('main')
    .controller('HotelNewCtrl', HotelNewCtrl);

    function HotelNewCtrl($scope, $state, $location, $document, HotelService) {
        var sc = $scope;

        sc.action = 'add';

        sc.name = '';
        sc.city = '';
        sc.adress = '';
        sc.fullDirectorName = '';
        sc.email = '';
        sc.directorPhoneNumber = '';
        sc.orderPhoneNumber = '';

        sc.save = function() {
            sc.hotel = {
                'name': sc.name,
                'country': sc.country,
                'city': sc.city,
                'street': sc.street,
                'email': sc.email,
                'zipcode': sc.zipcode,
                'website': sc.website,
                'phoneNumber': sc.phoneNumber,
                'fax': sc.fax
            };

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
                HotelService.new(sc.hotel)
					.success(function() {
					    sc.closeThisDialog(true);
					    sc.loadPage(1);
					});
            } else alert('Error');
        };

    };
})();
