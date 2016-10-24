(function(){
  'use_strict';
  angular
    .module('myApp')
    .controller('docController', docController);

function docController($scope, $routeParams, $location) {
    var docCtrl = this;
    $('body').css('overflow', 'scroll');
    $('body').scrollspy({ target: '#my-nav' });
    $('#ballMaze').hide();
    $("#ball").hover(function() {
        $("#ballMaze").show();
    });
    $("#sideNav").hover(function() {},
    function(){
        $("#ballMaze").hide();
    });
    $("#ball").click(function(event){     
        event.preventDefault();
        var target = $('#mazeTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#update").click(function(event){     
        event.preventDefault();
        var target = $('#updateTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#maxSpeed").click(function(event){     
        event.preventDefault();
        var target = $('#maxspeedTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#decelerate").click(function(event){     
        event.preventDefault();
        var target = $('#decelerateTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#wallBounce").click(function(event){     
        event.preventDefault();
        var target = $('#wallbounceTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#keyPresses").click(function(event){     
        event.preventDefault();
        var target = $('#keypressTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
}

})();