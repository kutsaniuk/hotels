(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelProfileCtrl', HotelProfileCtrl);

	function HotelProfileCtrl ($scope, $state, $stateParams, ngDialog, HotelService) {
		var sc = $scope;
		sc.table = 'developer';

		sc.id = $stateParams.id;

		sc.target = { 
				target: '/dev/logo?id=' + $stateParams.id,
				testChunks: false,
				singleFile: true
			};

		HotelService.get($stateParams.id)
	  		.success( function (data) {
	  			sc.profile = data;
	  		});

	  	sc.getLogoById = function (id) {
	  		HotelService.getLogo(id)
	  		.success( function (data) {
	  			sc.devLogo = '';
	  			sc.devLogo = data;
	  		});
	  	}

	  	sc.openLogoUpload = function () {
	  		ngDialog.open({ 
				template: '/app/modules/developer/profile/developer.logo.upload.view.html', 
				className: 'ngdialog-theme-default',
				showClose: true,
				scope: $scope
			});
	  	}

	  	sc.getLogoById(sc.id);

	};
})();
