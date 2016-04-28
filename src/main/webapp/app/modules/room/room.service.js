(function () {
    'use strict';

    angular.module('main')
    .service('RoomService', function ($http) {

        var urlBase = '/room';

        this.getAll = function () {
            return $http.get(urlBase); 
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (room) {
            return $http.post(urlBase, room);
        };

        this.update = function (room) {
            return $http.put(urlBase, room)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, roomType, bedType, breakfast) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size,
                        roomType: roomType,
                        bedType: bedType,
                        breakfast: breakfast
                    }
            });
        };

    });

})();
