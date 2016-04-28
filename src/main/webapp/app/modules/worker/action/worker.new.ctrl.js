(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerNewCtrl', WorkerNewCtrl);

	function WorkerNewCtrl ($scope, $state, $location, WorkerService, HotelService) {
		var sc = $scope;

		sc.action = 'add';
        sc.formValid = false;

		sc.fullName = '';
        sc.post = '';
        sc.birthday = new Date();
        sc.sex = '';
        sc.experience = '';
        sc.previousPost = '';
        sc.dateOfEmployment = new Date();
        sc.selHotel = { id: ''};

		HotelService.getAll().success( function (data) {
			sc.hotels = data.content;
		});

		sc.checkForm = function () {
            if (sc.fullName != '' 
				&& sc.post != ''
				&& sc.birthday != ''
				&& sc.sex != ''
				&& sc.experience != ''
				&& sc.experience != null
				&& sc.previousPost != ''
				&& sc.dateOfEmployment != ''
				&& sc.selHotel != ''
                && sc.workerForm.$valid
            ) sc.formValid = true;
            else sc.formValid = false;
        }

		sc.save = function () {

			sc.worker = {
				'fullName': sc.fullName,
				'post': sc.post,
				'birthday': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate(),
				'sex': sc.sex,
				'experience': sc.experience,
				'previousPost': sc.previousPost,
				'dateOfEmployment': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate(),
				'hotel': sc.selHotel
			}

			if (sc.formValid) WorkerService.new(sc.worker)
				.success(function (data) {
					sc.loadPage(sc.currentPage);
					sc.closeThisDialog(true);
				});
		}
	}
})();
