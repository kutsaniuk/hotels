(function () {
	'use strict';

	angular
	.module('main')
	.controller('TableCtrl', TableCtrl);

	function TableCtrl($scope, $state, $http, HotelsService) {  
		var sc = $scope;
		
    	sc.field = undefined

        sc.setField = function(field) {
            sc.field = field;
            alert();
        }

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
