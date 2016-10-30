(function(){
  'use_strict';
  angular
    .module('myApp')
    .controller('docController', docController);

function docController($scope, $routeParams, $location) {
    var docCtrl = this;
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $(".sidebar").css("position", "fixed");
            $(".sidebar").css("margin-top", "-90px");
        } else {
            $(".sidebar").css("position", "absolute");
            $(".sidebar").css("margin-top", "20px");
        }
    });
    $('body').scrollspy({ target: '.sideNavSpy', offset: 100 });
    $('.sideNavSpy').on('activate.bs.scrollspy', function (target) {
        var tar = target.target.id;
        //  ball, update, maxSpeed, decelerate, wallBounce, keyPresses, sizeChange, viewBox
        if (tar == 'topHide') {
            $('#ballMaze').hide();
            $('#ball').css("background-color", "transparent");
        }
        if (tar == 'ball') {
            $('#ballMaze').show();
            $('#ball').css("background-color", "#dddddd");
            $("#update").css("background-color", "transparent");
        } else if (tar == 'update') {
            $('#ballMaze').show();
            $('#ball').css("background-color", "transparent");
            $("#update").css("background-color", "#dddddd");
            $('#maxSpeed').css("background-color", "transparent");
        }
        else if (tar == 'maxSpeed') {
            $('#ballMaze').show();
            $('#update').css("background-color", "transparent");
            $("#maxSpeed").css("background-color", "#dddddd");
            $('#decelerate').css("background-color", "transparent");
        }
        else if (tar == 'decelerate') {
            $('#ballMaze').show();
            $('#maxSpeed').css("background-color", "transparent");
            $("#decelerate").css("background-color", "#dddddd");
            $('#wallBounce').css("background-color", "transparent");
        }
        else if (tar == 'wallBounce') {
            $('#ballMaze').show();
            $('#decelerate').css("background-color", "transparent");
            $("#wallBounce").css("background-color", "#dddddd");
            $('#keyPresses').css("background-color", "transparent");
        }
        else if (tar == 'keyPresses') {
            $('#ballMaze').show();
            $('#wallBounce').css("background-color", "transparent");
            $("#keyPresses").css("background-color", "#dddddd");
            $('#sizeChange').css("background-color", "transparent");
        }
        else if (tar == 'sizeChange') {
            $('#ballMaze').show();
            $('#keyPresses').css("background-color", "transparent");
            $("#sizeChange").css("background-color", "#dddddd");
            $('#viewBox').css("background-color", "transparent");
        }
        else if (tar == 'viewBox') {
            $('#sizeChange').css("background-color", "transparent");
            $("#viewBox").css("background-color", "#dddddd");
            $("#arb").css("background-color", "transparent");
            $('#arbDoc').hide();
            $("#ballMaze").show();
        }
        else if (tar == 'arb') {
            $('#ballMaze').hide();
            $('#arbDoc').show();
            $('#viewBox').css("background-color", "transparent");
            $("#arb").css("background-color", "#dddddd");
            $("#apiCall").css("background-color", "transparent");
        }
        else if (tar == 'apiCall') {
            $('#arb').css("background-color", "transparent");
            $("#apiCall").css("background-color", "#dddddd");
        }
    })
    $('#ballMaze').hide();
    $('#arbDoc').hide();
    $("#ball").click(function(event){     
        event.preventDefault();
        var target = $('#mazeTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
        $('ballMaze').show();
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
    $("#arb").click(function(event){     
        event.preventDefault();
        var target = $('#arbTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
    $("#apiCall").click(function(event){     
        event.preventDefault();
        var target = $('#apiCallTitle');
        var scrollToPosition = $(target).offset().top - 100;
        $('html,body').animate({
            scrollTop: scrollToPosition}, 500
        );
    });
}

})();