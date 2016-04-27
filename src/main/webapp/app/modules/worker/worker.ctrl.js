(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerCtrl', WorkerCtrl);

	function WorkerCtrl ($scope, $state, WorkerService, HotelService, RoomService, ngDialog) {
		var sc = $scope;
		
		sc.table = 'worker';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'fullName', 
		'post',
		'birthday',
		'sex',
		'experience',
		'previousPost',
		'dateOfEmployment'
		];

		sc.openEdit = function (id) {
			ngDialog.open({ 
				template: '/app/modules/worker/action/worker.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'WorkerEditCtrl',
				scope: $scope
			});
			sc.id = id;
		};

		sc.openAdd = function () {
			ngDialog.open({ 
				template: '/app/modules/worker/action/worker.action.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'WorkerNewCtrl',
				scope: $scope
			});
		};

		sc.openDelete = function (id) {
			sc.id = id; 
			ngDialog.open({ 
				template: '/app/modules/worker/action/worker.action.delete.view.html', 
				className: 'ngdialog-theme-dev',
				showClose: false,
				controller: 'WorkerDeleteCtrl',
				scope: $scope
			});
		};

		sc.loadPage = function(currentPage, fullName, post, date) {
			if (date != null) {
				var date = new Date(date);
				date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
			}

			WorkerService.getPage(currentPage - 1, 10, fullName, post, date)
			.success(function (data){
				sc.main = data;
			});

			sc.fullName = fullName;
			sc.post = post;
			sc.date = date;
		};

		sc.devName = {};
		sc.licName = {};

		HotelService.getAll().success( function (data) {
			sc.developers = data.content;
		});

		RoomService.getAll().success( function (data) {
			sc.licensies = data.content;
		});

		sc.loadPage(1); 
	};

})();
