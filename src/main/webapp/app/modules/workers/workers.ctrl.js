(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkersCtrl', WorkersCtrl);

	function WorkersCtrl($scope) {
		var sc = $scope;
		sc.table = 'Workers';
		sc.tableDataRows = 'workers'

		sc.tableHeader = 
		[
			'Full name', 
			'Position',
			'Birthday',
			'Age',
			'Sex',
			'Experience',
			'Previous position',
			'Date'
		];

		sc.tableData = 
		[
			{
				'fullName': '2', 
				'position': 'aaa',
				'birthday': 'aaa',
				'age': 'aaa',
				'sex': 'aaa',
				'experience': 'aaa',
				'previousPosition': 'aaa',
				'date': 'aaa'
			},
			{
				'fullName': '2', 
				'position': 'aaa',
				'birthday': 'aaa',
				'age': 'aaa',
				'sex': 'aaa',
				'experience': 'aaa',
				'previousPosition': 'aaa',
				'date': 'aaa'
			}

		];


	};

})();
