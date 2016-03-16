(function () {
	'use strict';

	angular
	.module('main')
	.controller('HotelsCtrl', HotelsCtrl);

	function HotelsCtrl($scope, $state, $location, HotelsService) {
		var sc = $scope;
		var activeTable = $location.path();

		sc.table = 'hotels';
		sc.base = '/' + sc.table;

		sc.tableHeader = 
		[
		'name', 
		'country',
		'city',
		'adress',
		'director',
		'email',
		'phoneOfDirector',
		'phoneOrders'
		];

		HotelsService.getAll()
		.success(function (data) {
			sc.tableData = data;
			sc.totalItems = sc.tableData.length;
		});

		sc.openAdd = function () {
			$state.go('main.hotels.new');
			sc.name = null;
			sc.country = null;
			sc.city = null;
			sc.adress = null;
			sc.director = null;
			sc.email = null;
			sc.phoneOfDirector = null;
			sc.phoneOrders = null;
		}

		sc.openEdit = function (id) {
			$state.go('main.hotels.edit');

			HotelsService.get(id)
			.success(function (data) {
				sc.hotel = data;
				sc.id = id;
				sc.name = sc.hotel.name;
				sc.country = sc.hotel.country;
				sc.city = sc.hotel.city;
				sc.adress = sc.hotel.adress;
				sc.director = sc.hotel.director;
				sc.email = sc.hotel.email;
				sc.phoneOfDirector = sc.hotel.phoneOfDirector;
				sc.phoneOrders = sc.hotel.phoneOrders;
			});
		}

		sc.save = function () {
			sc.hotel = 
			{
				'name': sc.name, 
				'country': sc.country,
				'city': sc.city,
				'adress': sc.adress,
				'director': sc.director,
				'email': sc.email,
				'phoneOfDirector': sc.phoneOfDirector,
				'phoneOrders': sc.phoneOrders
			};

			switch(activeTable) {
				case sc.base + '/new': {
					HotelsService.new(sc.hotel)
					.success(function (data) {
						alert('added!');
					});
					break;
				}
				case sc.base + '/edit': {
					HotelsService.update(sc.id, sc.hotel)
					.success(function (data) {
						alert('updated!');
						sc.hotel = null;
					});
					break;
				}
			}
		}

		sc.delete = function (id) {
			sc.hotel = 
			{
				'name': sc.name, 
				'country': sc.country,
				'city': sc.city,
				'adress': sc.adress,
				'director': sc.director,
				'email': sc.email,
				'phoneOfDirector': sc.phoneOfDirector,
				'phoneOrders': sc.phoneOrders
			};

			HotelsService.delete(id, sc.hotel)
			.success(function (data) {
				alert('deleted!');
				sc.hotel = null;
			});
		}
	};
})();
