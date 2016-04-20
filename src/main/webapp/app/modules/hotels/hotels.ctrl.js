(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelsCtrl', HotelsCtrl);

	function HotelsCtrl ($scope, $state, $http, $translate, HotelsService) {
		var sc = $scope;

		sc.table = 'hotel';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'adress',
		'director',
		'email',
		'phoneOfDirector',
		'phoneOrders'
		];

		sc.openEdit = function (id) {
			$state.go('main.hotel.edit');
			sc.id = id;
		};

		sc.openAdd = function () {
			$state.go('main.hotel.new');
		};

		sc.openDelete = function (id) {
			$state.go('main.hotel.delete');
			sc.id = id;
		};

		sc.close = function () {
			$state.go('main.' + sc.table);
		};

		sc.loadPage = function(currentPage) {
			HotelsService.getPage(currentPage, 10)
			.success(function (data){
				sc.main = data;
			});
		};

		sc.searchByField = function(field, value) {
			if (value != '') {
				HotelsService.searchByField(field, value)
				.success(function (data){
					sc.main = data;
				});
			}
			else sc.loadPage(1); 
		};

		sc.loadPage(1); 

		$http.get('app/shared/dropdown/countries/countries.json').success(function (data) {
			sc.countriesWithFlags = data;
		});

		// sc.keys = Object.keys(sc.country);
		
	};
})();
