(function () {
    'use strict';

    angular.module('main')
    .service('WorkerService', function ($http) {

        var urlBase = '/worker';

        this.getAll = function () {
            return $http.get(urlBase, { 
                    params: { 
                        page: 0, 
                        size: 1000
                    }
                });
        };

        this.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.new = function (worker) {
            return $http.post(urlBase, worker);
        };

        this.update = function (worker) {
            return $http.put(urlBase, worker)
        };

        this.delete = function (id) {
            return $http.delete(urlBase, { 
                    params: { 
                        id: id
                    }
                }); 
        };

        this.getPage = function (currentPage, size, fullName, post, date) {
            return $http.get(urlBase, { 
                    params: { 
                        page: currentPage, 
                        size: size,
                        fullName: fullName,
                        post: post,
                        date: date
                    }
            });
        };

        this.getImages = function (id) {
            return $http.get(urlBase + '/images', { 
                    params: { 
                        id: id
                    }
            });
        }

        this.deleteImageById = function (id) {
            return $http.delete(urlBase + '/images', { 
                    params: { 
                        id: id
                    }
            });
        }

    });

})();
