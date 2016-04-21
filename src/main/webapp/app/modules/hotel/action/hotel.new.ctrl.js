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
        sc.address = '';
        sc.fullDirectorName = '';
        sc.email = '';
        sc.directorPhoneNumber = '';
        sc.orderPhoneNumber = '';

        sc.save = function() {
            sc.hotel = {
                'name': sc.name,
                'city': sc.city,
                'address': sc.address,
                'fullDirectorName': sc.fullDirectorName,
                'email': sc.email,
                'directorPhoneNumber': sc.directorPhoneNumber,
                'orderPhoneNumber': sc.orderPhoneNumber
            };

            if (sc.name != '' 
                && sc.city != '' 
            	&& sc.address != '' 
            	&& sc.fullDirectorName != '' 
            	&& sc.email != '' 
            	&& sc.directorPhoneNumber != '' 
            	&& sc.orderPhoneNumber != '' 
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
