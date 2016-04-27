(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerDeleteCtrl', WorkerDeleteCtrl);

	function WorkerDeleteCtrl ($scope, $state, $location, WorkerService) {
		var sc = $scope;

		sc.delete = function () {
			WorkerService.delete(sc.id)
			.success(function (data) {
				sc.loadPage(1);
				sc.closeThisDialog(true);
			});
		}
	};
})();
