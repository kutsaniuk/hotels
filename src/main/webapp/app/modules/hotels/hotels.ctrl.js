(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelsCtrl', HotelsCtrl);

	function HotelsCtrl($scope) {
		var sc = $scope;
		sc.table = 'Hotels';
		sc.tableDataRows = 'hotels'

		sc.tableHeader = 
		[
			'Name', 
			'Country',
			'City',
			'Adress',
			'Director',
			'Email',
			'Phone of Director',
			'Phone Orders'
		];

		sc.tableData = 
		[
			{
				'name': 'aaa', 
				'country': 'aaa',
				'city': 'aaa',
				'adress': 'aaa',
				'director': 'aaa',
				'email': 'aaa',
				'phoneOfDirector': 'aaa',
				'phoneOrders': 'aaa'
			},
			{
				'name': 'bbb', 
				'country': 'bbb',
				'city': 'bbb',
				'adress': 'bbb',
				'director': 'bbb',
				'email': 'bbb',
				'phoneOfDirector': 'bbb',
				'phoneOrders': 'bbb'
			},

		];


	};

})();
