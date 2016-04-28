(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerEditCtrl', WorkerEditCtrl);

	function WorkerEditCtrl ($scope, $state, $location, WorkerService, HotelService, RoomService) {
		var sc = $scope;

		sc.action = 'edit';
        sc.formValid = false;

		WorkerService.get(sc.id)
		.success(function (data) {
			sc.worker = data;

			sc.id = sc.worker.id;
			sc.fullName = sc.worker.fullName;
			sc.post = sc.worker.post;
			sc.birthday = new Date(sc.worker.birthday);
			sc.sex = sc.worker.sex;
			sc.experience = sc.worker.experience;
			sc.previousPost = sc.worker.previousPost;
			sc.dateOfEmployment = new Date(sc.worker.dateOfEmployment);

			sc.selHotel = sc.worker.hotel;

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
				sc.soft = {
					'id': sc.id,
					'fullName': sc.fullName,
					'post': sc.post,
					'birthday': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate(),
					'sex': sc.sex,
					'experience': sc.experience,
					'previousPost': sc.previousPost,
					'dateOfEmployment': sc.birthday.getFullYear() + '-' + sc.birthday.getMonth() + '-' + sc.birthday.getDate(),
					'hotel': sc.selHotel
				}

				if (sc.formValid) WorkerService.update(sc.soft)
					.success(function (data) {
						sc.loadPage(sc.currentPage);
						sc.closeThisDialog(true);
					});
			}
		});
	}
})();
