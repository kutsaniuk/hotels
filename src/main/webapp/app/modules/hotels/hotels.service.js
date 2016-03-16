(function () {
    'use strict';

    angular.module('main')
    .service('HotelsService', function ($http) {

        var urlBase = '../data/hotels/';

        this.getAll = function () {
            return $http.get(urlBase + 'hotels.list.json');
        };

        this.get = function (id) {
            return $http.get(urlBase + id);
        };

        this.new = function (hotel) {
            return $http.post(urlBase, hotel);
        };

        this.update = function (id, hotel) {
            return $http.put(urlBase + id, hotel)
        };

        this.delete = function (id) {
            return $http.delete(urlBase + id);
        };

    });

})();
