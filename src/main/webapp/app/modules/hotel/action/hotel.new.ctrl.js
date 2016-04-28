(function() {
    'use strict';

    angular
    .module('main')
    .controller('HotelNewCtrl', HotelNewCtrl);

    function HotelNewCtrl($scope, $state, $location, $document, HotelService, RoomService, ngDialog) {
        var sc = $scope;

        sc.action = 'add';
        sc.formValid = false;

        sc.name = '';
        sc.city = '';
        sc.address = '';
        sc.fullDirectorName = '';
        sc.email = '';
        sc.directorPhoneNumber = '';
        sc.orderPhoneNumber = '';

        sc.rooms = [];
        
        RoomService.getAll()
            .success(function (data){
                sc.main = data;

            }); 

        sc.checkForm = function () {
            if (sc.name != '' 
                && sc.city != '' 
                && sc.address != '' 
                && sc.fullDirectorName != '' 
                && sc.email != '' 
                && sc.directorPhoneNumber != '' 
                && sc.orderPhoneNumber != '' 
                && sc.hotelForm.$valid
            ) sc.formValid = true;
            else sc.formValid = false;
        }

        sc.openRoomAdd = function () {
            ngDialog.open({ 
                template: '/app/modules/hotel/action/hotel.action.new.room.view.html', 
                className: 'ngdialog-theme-dev',
                showClose: false,
                scope: $scope,
                disableAnimation: true
            });
        };

        sc.cancelRoomAdd = function () {
            sc.rooms = [];
        }

        sc.save = function() {
            sc.hotel = {
                'name': sc.name,
                'city': sc.city,
                'address': sc.address,
                'fullDirectorName': sc.fullDirectorName,
                'email': sc.email,
                'directorPhoneNumber': sc.directorPhoneNumber,
                'orderPhoneNumber': sc.orderPhoneNumber

                // 'rooms': {"id": 6, "roomType": "PRESIDENT", "roomCount": 5, "bedType": false, "breakfast": true},
                // 'workers': {"id":5,"fullName":"worker5","post":"post5","birthday":"1996-11-08","sex":"MALE","experience":10,"previousPost":"previous_post5","dateOfEmployment":"2010-12-05"}
            };

            if (sc.formValid) HotelService.new(sc.hotel)
				.success(function() {
				    sc.loadPage(sc.currentPage);
                    sc.closeThisDialog(true);
				});
        };

    };
})();
