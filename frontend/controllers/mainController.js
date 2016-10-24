(function(){
  'use_strict';
  angular
    .module('myApp')
    .controller('mainController', mainController);

function mainController($scope, $routeParams, $location) {
    var mainCtrl = this;
    $('body').css('overflow', 'scroll');
    if ($routeParams.scrollTo != undefined) {
    	if ($routeParams.scrollTo == 'portfolio') {	    	 
		    var target = $('#portfolioTitle');
		    var scrollToPosition = $(target).offset().top - 100;
	        $('html,body').animate({
	            scrollTop: scrollToPosition}, 500
	        );
	    }
	    if ($routeParams.scrollTo == 'about') {	    	 
		    var target = $('#aboutTitle');
		    var scrollToPosition = $(target).offset().top - 100;
	        $('html,body').animate({
	            scrollTop: scrollToPosition}, 500
	        );
	    }

    }
    $("#home").click(function(event){     
        event.preventDefault();
        var target = $('#homeTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#portfolio").click(function(event){     
        event.preventDefault();
        var target = $('#portfolioTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#about").click(function(event){     
        event.preventDefault();
        var target = $('#aboutTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
}

})();

