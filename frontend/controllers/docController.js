(function(){
  'use_strict';
  angular
    .module('myApp')
    .controller('docController', docController);

function docController($scope, $routeParams, $location) {
    var docCtrl = this;
    $('body').scrollspy({ target: '#my-nav' });
    $('#ballMaze').hide();
    $("#ball").click(function(event){     
        event.preventDefault();
        var target = $('#mazeTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
        $("#ballMaze").toggle();
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
    $("#sizeChange").click(function(event){     
        event.preventDefault();
        var target = $('#sizeChangeTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#viewBox").click(function(event){     
        event.preventDefault();
        var target = $('#viewboxTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
}

})();