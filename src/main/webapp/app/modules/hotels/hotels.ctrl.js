(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelsCtrl', HotelsCtrl);

	function HotelsCtrl ($scope, $state, $location, HotelsService) {
		var sc = $scope;
		var activeTable = $location.path();

		sc.table = 'hotels';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'country',
		'city',
		'adress',
		'director',
		'email',
		'phoneOfDirector',
		'phoneOrders'
		];

		HotelsService.getAll()
		.success(function (data) {
			sc.tableData = data;
			sc.totalItems = sc.tableData.length;
		});

		sc.openEdit = function (id) {
			$state.go('main.hotels.edit');
			sc.id = id;
		}

		sc.openAdd = function () {
			$state.go('main.hotels.new');
		}

		sc.openDelete = function (id) {
			$state.go('main.hotels.delete');
			sc.id = id;
		}

		sc.close = function () {
			$state.go('main.' + sc.table);
		}
	};
})();
