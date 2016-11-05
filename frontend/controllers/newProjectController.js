(function(){
  	'use_strict';
  	angular
    	.module('myApp')
    	.controller('newProjectController', newProjectController);

function newProjectController($scope, $routeParams, $location, $route, $interval) {
	var newProCtrl = this;
	var controls = {};
	var canJump = false;
	function User(x, y, w, l, velX, velY, html_id) {
		var makeSVG = function(tag, attrs) {
			var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
			for (var k in attrs) {
				el.setAttribute(k, attrs[k]);
			}
			return el;
		}
		this.info = { x: x, y: y, velX: velX, velY: velY, w: w, l: l, html_id: html_id};
		this.initialize = function(x, y, w, l, html_id) {
			var user = makeSVG('rect',
				{	x: x,
					y: y,
					width: w,
					height: l,
					id: html_id,
					style: 'fill: blue; stroke: black; stroke-width: .3'
			});
		document.getElementById('newsvg').appendChild(user);
		}
		this.update = function(time, maxspeed, gravity, accelX, accelY, maxX, maxY) {
			var el = document.getElementById(1);
			var controls = map.controls(this.info.velX, this.info.velY, accelX, accelY);
			this.info.velX = controls[0];
			this.info.velY = controls[1];
			var gravity = map.gravity(this.info.y, this.info.velY, this.info.l, maxY, gravity);
			this.info.velY = gravity[0];
			this.info.y = gravity[1];
			var friction = map.friction(this.info.velX, accelX, maxX);
			this.info.velX = friction[0];



			this.info.x = this.info.x + this.info.velX * time;
			this.info.y = this.info.y + this.info.velY * time;
			el.setAttribute('x', this.info.x);
			el.setAttribute('y', this.info.y);

		}
	this.initialize(x,y,w,l,html_id);
	}

	function Arena() {
		this.createUser = function(x,y,w,l,velX,velY,html_id) {
			newProCtrl.user = new User(x,y,w,l,velX,velY,html_id);
		}
		// main loop for all game function. is called from mainInterval
		this.loop = function() {
			// HERE params: 
			newProCtrl.user.update(1, 5, 0.03, 0.05, 0.5, 3, 10);
		}
		this.controls = function(velX,velY,accelX,accelY) {
			if (controls[38] == true && controls[39] == true) {
				if (canJump == true) {
					velY -= accelY;
				}
				velX += accelX;
			} else if (controls[38] == true && controls[37] == true) {
				if (canJump == true) {
					velY -= accelY;
				}
				velX -= accelX;
			} else if (controls[39] == true && controls[37] != true) {
				velX += accelX;
			} else if (controls[37] == true && controls[39] != true) {
			  	velX -= accelX;
			} else if (controls[38] == true && canJump == true) {
				velY -= accelY;
			}
			return [velX, velY];
		}
		this.gravity = function(y, velY, l, maxY, gravity) {
			if (y < 500 - (l/2)) {
				velY += gravity;
				canJump = false;
			}
			if (y > 500 - (l/2)) {
				velY = 0;
				y = 500 - (l/2);
				canJump = true;
			}
			if (Math.abs(velY) > maxY) {
				if (velY > 0) {
					velY = maxY;
				} else {
					velY = -maxY;
				}
			}
			return [velY, y]
		}
		this.friction = function(velX, accelX) {
			if (canJump == true) {
				if (Math.abs(velX) < accelX) {
					velX = 0;
				} else if(controls[37] != true && controls[39] != true) {
					velX -= velX/12;
				}
			}
			return [velX];
		}
		this.maxspeed = function(velX, velY, maxX, maxY) {

		}
		// params: x location, y location, width, length, id
		this.createUser(100, 100, 10, 10, 0, 0, 1);	
	}
	document.addEventListener('keydown', keyDownTextField, false);
	document.addEventListener('keyup', keyUpTextField, false);
	function keyDownTextField(e) {
		var keyCode;
		if (e != undefined) {
			e.preventDefault();
			keyCode = e.keyCode;
			controls[keyCode] = true;
		}
	}
	function keyUpTextField(e) {
		var keyCode = e.keyCode;
		controls[e.keyCode] = false;
		keyDownTextField();
	}
	var map = new Arena();
	var initInterval = $interval(map.loop, 10);
	// physics route: map.loop, user.update, physics function
}
})();