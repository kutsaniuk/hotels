(function () {
	'use strict';

	angular
	.module('main')
	.controller('RoomProfileCtrl', RoomProfileCtrl);

	function RoomProfileCtrl ($scope, $state, $stateParams, ngDialog, HotelService, WorkerService, RoomService) {
		var sc = $scope;
		sc.table = 'room';
		sc.imageUploadShow = false;

		sc.id = $stateParams.id;

		sc.targetImages = { 
				target: '/room/images?id=' + $stateParams.id,
				testChunks: false
			};

		sc.targetBackground = { 
				target: '/room/background?id=' + $stateParams.id,
				testChunks: false,
				singleFile: true
			};

		
		RoomService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  			sc.hotel = data;
	  		});

	  	sc.getImages = function (id) { 
	  		RoomService.getImages(id)
	  		.success( function (data) {
	  			sc.images = data;
	  			if (data == '') sc.imageUploadShow = true;
	  		});
	  	}

	  	sc.getBackground = function (id) {
	  		RoomService.getBackground(id)
	  		.success( function (data) {
	  			sc.background = data.background;
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

		sc.deleteImage = function (id) {
			RoomService.deleteImageById(id).success( function (data) {
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

	  	sc.getImages(sc.id);
	  	sc.getBackground(sc.id);

	};
})();
