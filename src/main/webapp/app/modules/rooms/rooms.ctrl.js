(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomsCtrl', RoomsCtrl);

	function RoomsCtrl($scope) {
		var sc = $scope;
		sc.table = 'Rooms';
		sc.tableDataRows = 'rooms'

		sc.tableHeader = 
		[
			'Room type', 
			'Number of rooms',
			'Type of bed',
			'Breakfast',
			'Price'
		];

		sc.tableData = 
		[
			{
				'roomType': '3', 
				'numberOfRooms': 'aaa',
				'typeOfBed': 'aaa',
				'breakfast': 'aaa',
				'price': 'aaa'
			},
			{
				'roomType': '3', 
				'numberOfRooms': 'aaa',
				'typeOfBed': 'aaa',
				'breakfast': 'aaa',
				'price': 'aaa'
			}

		];


	};

})();
