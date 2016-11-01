(function(){
  'use_strict';
  angular
    .module('myApp')
    .controller('mainController', mainController);

function mainController($scope, $routeParams, $location) {
    var mainCtrl = this;
    var size = $('body').width();
    if (size < 768) {
        $('#head').css("margin-top", "175px");
    } else {
        $('#head').css("margin-top", "0px");
    }
    $(window).resize(function(e) {
        var size = $('body').width();
        if (size < 768) {
            $('#head').css("margin-top", "175px");
        } else {
            $('#head').css("margin-top", "0px");
        }
    });
    $('body').scrollspy({ target: '.sideNavSpy', offset: 100 });
    if ($routeParams.scrollTo != undefined) {
    	if ($routeParams.scrollTo == 'portfolio') {	    	 
		    var target = $('#portfolio');
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

