(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelProfileCtrl', HotelProfileCtrl);

	function HotelProfileCtrl ($scope, $state, $stateParams, ngDialog, HotelService, WorkerService, RoomService) {
		var sc = $scope;
		sc.table = 'hotel';
		sc.imageUploadShow = false;

		sc.id = $stateParams.id;

		sc.targetImages = { 
				target: '/hotel/images?id=' + $stateParams.id,
				testChunks: false
			};

		sc.targetLogo = { 
				target: '/hotel/logo?id=' + $stateParams.id,
				testChunks: false,
				singleFile: true
			};

		
		HotelService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  			sc.hotel = data;
	  		});

	  	WorkerService.getAll()
	  		.success( function (data) {
	  			sc.workers = data.content;
	  		});

	  	RoomService.getAll()
	  		.success( function (data) {
	  			sc.rooms = data.content;
	  		});

	  	sc.getLogoById = function (id) {
	  		HotelService.getLogo(id)
	  		.success( function (data) {
	  			sc.hotelLogo = data;
	  		});
	  	}

	  	sc.getImages = function (id) {
	  		HotelService.getImages(id)
	  		.success( function (data) {
	  			sc.images = data;
	  			if (data == '') sc.imageUploadShow = true;
	  		});
	  	}

	  	sc.openLogoUpload = function () {
	  		ngDialog.open({ 
				template: '/app/modules/hotel/profile/hotel.logo.upload.view.html', 
				className: 'ngdialog-theme-default',
				showClose: true,
				scope: $scope
			});
	  	}

	  	sc.openImageById = function (index) {
			ngDialog.open({ 
				template: '/app/shared/image/image.fullsreen.view.html', 
				className: 'ngdialog-theme-image-view',
				showClose: false,
				scope: $scope
			});
			sc.imgIndex = index;
		};

		sc.openWorkers = function () {
			ngDialog.open({ 
				template: '/app/modules/hotel/profile/hotel.worker.view.html',
				className: 'ngdialog-theme-dev',
				showClose: false,
				scope: $scope,
				disableAnimation: true
			});
		};

		sc.openRooms = function () {
			ngDialog.open({ 
				template: '/app/modules/hotel/profile/hotel.room.view.html',
				className: 'ngdialog-theme-dev',
				showClose: false,
				scope: $scope,
				disableAnimation: true
			});
		};

		sc.deleteImage = function (id) {
			HotelService.deleteImageById(id).success( function (data) {
	  			sc.getImages(sc.id); 
	  		});	 
		}

		sc.previousImage = function () {
			if (sc.imgIndex == 0) sc.imgIndex = sc.images.length;
			sc.imgIndex --;
		}

		sc.nextImage = function () {
			sc.imgIndex ++;
			if (sc.imgIndex == sc.images.length) sc.imgIndex = 0;
		}

	  	sc.getLogoById(sc.id);
	  	sc.getImages(sc.id);

	};
})();
