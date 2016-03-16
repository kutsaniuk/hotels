(function () {
	'use strict';

	angular
	.module('main')
	.controller('TableCtrl', TableCtrl);

	function TableCtrl($scope, $state) {  
		var sc = $scope;
		
		// Pagination
		sc.viewby = 8;
		sc.currentPage = 1;
		sc.itemsPerPage = sc.viewby;
		sc.maxSize = 5;

        //Sort 
        sc.fieldName = undefined;
        sc.reverse = false;

        sc.sort = function(fieldName) {
            $scope.reverse = ($scope.fieldName === fieldName) ? !$scope.reverse:false;
            $scope.fieldName = fieldName;
        }

        sc.isSortUp = function(fieldName) {
        	return sc.fieldName === fieldName && !sc.reverse;
        };

        sc.isSortDown = function(fieldName) {
        	return sc.fieldName === fieldName && sc.reverse;
        };
    }
})();
