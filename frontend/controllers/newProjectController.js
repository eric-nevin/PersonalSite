(function(){
  	'use_strict';
  	angular
    	.module('myApp')
    	.controller('newProjectController', newProjectController);

function newProjectController($scope, $routeParams, $location, $route, $interval) {
	var newProCtrl = this;
	var enemies = {};
	var enemyId = 2;
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
		this.info = { x: x, y: y, velX: velX, velY: velY, w: w, l: l, health: 50, html_id: html_id};
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
			var view = document.getElementById('newsvg');
			var controls = map.controls(this.info.velX, this.info.velY, accelX, accelY);
			this.info.velX = controls[0];
			this.info.velY = controls[1];
			var gravity = map.gravity(this.info.y, this.info.velY, this.info.l, maxY, gravity);
			this.info.velY = gravity[0];
			this.info.y = gravity[1];
			var friction = map.friction(this.info.velX, accelX, maxX);
			this.info.velX = friction[0];
			var arenaBarrier = map.arenaBarrier(this.info.x, this.info.velX, this.info.w);
			this.info.x = arenaBarrier[0];
			this.info.velX = arenaBarrier[1];
			for (key in enemies) {
				var collision = map.collision(this.info, enemies[key].info);
				if (collision == 'left') {
					this.info.velX = -(1000 * accelX);
					this.info.velY = -accelY;
					console.log('left');
				} else if (collision == 'right') {
					this.info.velX = (1000 * accelX);
					this.info.velY = -accelY;
					console.log('right');
				}
			}
			


			this.info.x = this.info.x + this.info.velX * time;
			this.info.y = this.info.y + this.info.velY * time;
			var x = this.info.x - 100;
			var y = this.info.y - 100;
			view.setAttribute('viewBox', x + " " + y + " 200 200");
			el.setAttribute('x', this.info.x);
			el.setAttribute('y', this.info.y);
		}
	this.initialize(x,y,w,l,html_id);
	}
	function Enemy(x, y, w, l, velX, velY, html_id) {
		var makeSVG = function(tag, attrs) {
			var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
			for (var k in attrs) {
				el.setAttribute(k, attrs[k]);
			}
			return el;
		}
		this.info = { x: x, y: y, velX: velX, velY: velY, w: w, l: l, html_id: html_id};
		this.initialize = function(x, y, w, l, html_id) {
			var enemy = makeSVG('rect',
				{	x: x,
					y: y,
					width: w,
					height: l,
					id: html_id,
					style: 'fill: red; stroke: black; stroke-width: .3'
			});
		document.getElementById('newsvg').appendChild(enemy);
		}
		this.update = function(time, velocity) {
			var el = document.getElementById(this.info.html_id);
			var enemyMovement = map.enemyMovement(newProCtrl.user.info.x, this.info.x, velocity);
			this.info.velX = enemyMovement;


			this.info.x = this.info.x + this.info.velX * time;
			el.setAttribute('x', this.info.x);
		}
		this.initialize(x,y,w,l,html_id);
	}
	function Arena() {
		this.createUser = function(x,y,w,l,velX,velY,html_id) {
			newProCtrl.user = new User(x,y,w,l,velX,velY,html_id);
		}
		this.createEnemy = function(x,y,w,l,velX,velY,html_id) {
			enemies[html_id] = new Enemy(x,y,w,l,velX,velY,html_id);
		}
		// main loop for all game function
		this.loop = function() {
			// HERE params:        time,maxspeed, gravity, accelX, accelY, maxX, maxY
			newProCtrl.user.update(1,   5,        0.06,    0.03,   1,    1,    10);
			for (key in enemies) {
				enemies[key].update(1, 0.3);
			}
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
			if (y < 500 - l) {
				velY += gravity;
				canJump = false;
			}
			if (y > 500 - l) {
				velY = 0;
				y = 500 - l;
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
		this.friction = function(velX, accelX, maxX) {
			if (canJump == true) {
				if (Math.abs(velX) < accelX) {
					velX = 0;
				} else if(controls[37] != true && controls[39] != true) {
					velX -= velX/12;
				}
			}
			if (Math.abs(velX) > maxX) {
				if (velX > 0) {
					velX = maxX;
				} else {
					velX = -maxX;
				}
			}
			return [velX];
		}
		this.arenaBarrier = function(x, velX, w) {
			var right = $('#newsvg').width();
			if (x < 0) {
				velX = 0;
				x = 0;
			} else if(x > right - w) {
				velX = 0;
				x = right - w;
			}
			return [x,velX];
		}
		this.enemyMovement = function(user, enemy, velocity) {
			if (user > enemy) {
				return velocity;
			} else {
				return -velocity;
			}
		}
		this.collision = function(user, player2) {
			userCenter = {x: user.x + (user.w/2), y: user.y + (user.l/2)};
			player2Center = {x: player2.x + (player2.w/2), y: player2.y + (player2.l/2)};
			var dx = player2Center.x - userCenter.x;
			var dy = player2Center.y - userCenter.y;
			var d = Math.sqrt((dy * dy) + (dx * dx));
			var theta = Math.atan2(dy, dx);
			var angle = (((theta * 180) / Math.PI)) % 360;
			angle = Math.round((angle < 0) ? 360 + angle : angle);
			var quadrant = angle % 90;
			if (quadrant < 45) {
				quadrant = 90 - quadrant;
			}
			var userLength = user.w / 2;
			if (theta != 0) {
				userLength = ((user.w / 2) / Math.sin(toRadians(quadrant)));
			}
			if (userLength == Infinity) {
				userLength = (user.w / 2);
			}
			if (d < (userLength * 2) || d < (userLength * 2)) {
				// if (userCente)
				if (userCenter.x > player2Center.x) {
					return "right";
				} else {
					return "left";
				}
			}
			return false;
		}
		// HERE params: x,   y,   w,  l,  velX,velY,html_id
		this.createUser(100, 100, 10, 10, 0,   0,   1);
		this.createEnemy(10, 490, 10, 10, 0,   0,   enemyId);
		enemyId++;
	}
	function toRadians (angle) {
  		return angle * (Math.PI / 180);
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