(function () {
	'use strict';

	angular
	.module('main')
	.controller('WorkerProfileCtrl', WorkerProfileCtrl);

	function WorkerProfileCtrl ($scope, $state, $stateParams, WorkerService, HotelService, ngDialog) {
		var sc = $scope;
		sc.table = 'worker';
		sc.imgIndex = 0;

		sc.id = $stateParams.id;

		sc.target = { 
				target: '/worker/logo?id=' + $stateParams.id,
				testChunks: false
			};

		sc.getLogo = function (id) {
			WorkerService.getLogo(id)
		  		.success( function (data) { 
		  			sc.logo = data.logo;
		  		});
		}

		sc.getImageId = function (index) {
			return sc.images[sc.imgIndex].id;
		}
 
		WorkerService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;

	  			HotelService.getLogo(data.hotel.id)
			  		.success( function (data) {
			  			sc.hotelLogo = '';
			  			sc.hotelLogo = data;
			  		});

			  	sc.getLogo(sc.id);
	  		});

	  	sc.getImages = function () {
	  		WorkerService.getImages($stateParams.id)
	  		.success( function (data) {
	  			sc.images = data;
				if (sc.images != '') sc.currentImage = sc.images[0].image;
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
			WorkerService.deleteImageById(id).success( function (data) {
	  			sc.getImages();
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

		sc.openWorkers = function () {
			ngDialog.open({ 
				template: '/app/shared/image/image.fullsreen.view.html', 
				className: 'ngdialog-theme-image-view',
				showClose: false,
				scope: $scope
			});
		};
	};
})();
