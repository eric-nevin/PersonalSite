var myApp = angular.module('myApp', ["ngRoute",
									]);

(function(){
	myApp.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', 
		{
			controller: 'mainController',
			controllerAs: 'mainCtrl',
			templateUrl: 'static/partials/home.html',
			css: 'static/partials/main.css'
		})
		.when('/game',
		{
			controller: 'gameController',
			controllerAs: 'gameCtrl',
			templateUrl: 'static/partials/game.html',
			css: 'static/partials/game.css'
		})
		.when('/arbitrage',
		{
			controller: 'arbitrageController',
			controllerAs: 'arbCtrl',
			templateUrl: 'static/partials/arbitrage.html'
		})
		.when('/documentation',
		{
			controller: 'docController',
			controllerAs: 'docCtrl',
			templateUrl: 'static/partials/documentation.html'
		})
		.otherwise({
			redirectTo: "/"
		});
		$locationProvider.html5Mode(true);
	});
}());

