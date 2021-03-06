(function(){
  	'use_strict';
  	angular
    	.module('myApp')
    	.controller('gameController', gameController);

function gameController($scope, $routeParams, $location, $route, $interval) {
	var gameCtrl = this;
	$scope.$on("$destroy", function(){
	    $interval.cancel(mainInterval);
	});
	var SVGwid = $('#svg').width();
	var SVGhei = $('#svg').height();
	var keyPressed = [];
	var circles = {};
	var hitpoints = {};
	var circleId = 0;
	var mainInterval = 0;
	var deaths = 0;
	var barrier = [558,559,560,561,562,530,434,557,525,493,461,429,402,397,398,399,370,338,337,336,335,334,333,332,396,394,330,426,425,424,423,422,390,358,326,294,262,230,231,232,233,234,236,237,238,239,271,272,273,274,276,340,244,245,246,247,248,376,408,372,404,436,468,440,472,466,532,564,565,566,567,568,251,219,155,123,122,121,120,119,118,117,243,242,241,240,116,115,114,113,112,111,110,109,108,107,106,105,104,103,102,101,100,98,97,129,161,193,225,257,289,321,353,385,417,644,647,871,903,865,897,930,934,966,998,962,994,1029,1027,1059,1061,1093,1091,1123,1125,1186,1223,1191,1159,1127,1096,1064,1033,1001,969,937,906,874,842,810,778,746,714,682,650,618,586,588,1224,1225,1226,1227,1228,1229,1230,1231,1232,1233,792,824,856,888,920,952,984,1016,1048,1080,1112,1144,1176,1208,1240,1239,1238,1237,1236,1235,788,789,791,883,1111,1110,1109,1108,1107,1106,1105,1104,1103,1102,1101,1100,1099,1097,1098,879,880,881,882,751,719,687,655,623,498,500,587,187,99,1154,1234,591];
	var killBarrier = [395,331,235,275,339,280,312,344,409,378,345,228,355,453,546,611,675,806,738,1219,1220,1221,1218,1222,598,599,632,664,600,597,696,728,760,886,887,885,884,1207,1175,1137,1198,1132,1204,790,783,815,847,1622,1328,1519];
	var maxPowerups = [1668,1892,1673,1902,1683,1688,1917,366,308,216,150,212,146,581,1124,1793,1801,1806,1810,1815,1822,1907,1678,1897,1912,1693,817];
	var sizePowerups = [310,183,181,179,516,645,740,451,1729,1762,1795,1826,1857,1796,1797,1767,1799,1831,1864,1865,1866,1736,1737,1738,1771,1803,1835,1741,1742,1743,1776,1808,1840,1871,1870,1869,1759,1758,1757,1788,1820,1852,1885,1886,1887,1818,1817,1746,1747,1875,1874,1876,1845,1813,1781,1748,1812,1811,1412];
	var bouncyBarrier = [537,506,475,444,413,381,349,316,283,455,487,449,481,513,545,577,519,551,583,615,679,711,743,609,641,673,705,737,742,769,775,807,801,802,833,839,628,596,660,692,724,756,819,851,1663,1662,1661,1658,1657,1656,1655,1654,1653,1652,1651,1650,1649,1648,1647,1646,1645,1644,1643,1642,1641,1640,1639,1638,1637,1636,1635,1634,1633,1632,1659,1660,1272,1304,1336,1368,1400,1432,1464,1496,1528,1560,1592,1301,1334,1269,1397,1430,1461,1491,1394,1299,1329,1268,1267,1266,1265,1264,1263,1262,1261,1260,1259,1258,1257,1256,1255,1254,1253,1252,1251,1250,1282,1314,1346,1410,1442,1378,1474,1506,1538,1570,1602,1448,1416,1480,1415,1414,1446,1478,1423,1556,1554,1586,1551,1360,1294,1326,1358,1453,1488,1425,1456,1516,1578,1388,1421,1322,1292,1386,1549,1513,1544,1543,1604,1351,1384,1318,1348,1349,1475,1482,1483,1518,1553,1520,1612,1624,1605,1575,1607];
	var teleportIn = [458,726,1161,823,1015,1823,371,1447];
	var teleportOut = [630,1206,820,818,1792,526,1303,684];
	var speedUp = false;
	var allowEdit = false;
	var squareDist = {45: 14.142, 44: 13.902, 43: 13.673, 42: 13.456, 41: 13.25, 40: 13.054, 39: 12.868, 38: 12.69, 37: 12.521, 36: 12.361, 35: 12.208, 34: 12.062, 33: 11.924, 32: 11.792, 31: 11.666, 30: 11.547, 29: 11.434, 28: 11.326, 27: 11.223, 26: 11.126, 25: 11.034, 24: 10.946, 23: 10.864, 22: 10.785, 21: 10.711, 20: 10.642, 19: 10.576, 18: 10.515, 17: 10.457, 16: 10.403, 15: 10.353, 14: 10.306, 13: 10.263, 12: 10.223, 11: 10.187, 10: 10.154, 9: 10.125, 8: 10.098, 7: 10.075, 6: 10.055, 5: 10.038, 4: 10.024, 3: 10.014, 2: 10.006, 1: 10.002, 0: 10};
	var tips = [367,309,505,185,617,1162];
	var tipSpot = 0;
	function BackSquare(size) {
		var makeSVG = function(tag, attrs) {
			var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
			for (var k in attrs) {
				el.setAttribute(k, attrs[k]);
			}
			return el;
		}
		this.initialize = function(x, y, html_id, type) {
			if (type == 0) {
				var square = makeSVG('rect',
					{	x: x,
						y: y,
						width: size,
						height: size,
						id: html_id,
						style: 'fill: white; fill-opacity: 0; stroke: lightgrey; stroke-width: .3'
				});
			}
			if (type == 1) {
				var square = makeSVG('rect',
					{	x: x,
						y: y,
						width: size,
						height: size,
						id: html_id,
						style: 'fill: black;'
				});
			}
			if (type == 2) {
				var square = makeSVG('rect',
					{	x: x,
						y: y,
						width: size,
						height: size,
						id: html_id,
						style: 'fill: red;'
				});
			}
			if (type == 3) {
				var square = makeSVG('rect',
					{	x: x,
						y: y,
						width: size,
						height: size,
						id: html_id,
						style: 'fill: blue;'
				});
			}
			if (type == 4) {
				var square = makeSVG('rect',
					{	x: x,
						y: y,
						width: size,
						height: size,
						id: html_id,
						style: 'fill: grey;'
				});
			}
			if (type == 5) {
				var square = makeSVG('rect',
					{	x: x,
						y: y,
						width: size,
						height: size,
						id: html_id,
						style: 'fill: orange;'
				});
			}
			if (type == 6) {
				var square = makeSVG('rect',
					{	x: x,
						y: y,
						width: size,
						height: size,
						id: html_id,
						style: 'fill: white; fill-opacity: 0; stroke: red; stroke-width: 1;'
				});
			}
			if (type == 7) {
				var square = makeSVG('rect',
					{	x: x,
						y: y,
						width: size,
						height: size,
						id: html_id,
						style: 'fill: white; fill-opacity: 0; stroke: blue; stroke-width: 1;'
				});
			}
			document.getElementById('svg').appendChild(square);
		}
		// 32 high, 60 wide
		var count = 0;
		var html_id = 100;
		var wid = SVGwid;
		var hei = SVGhei;
		for (var i = 0; i < wid; i = i + size) {
			for (var j = 0; j < hei; j = j + size) {
				var type = 0;
				for (var k = 0; k < barrier.length; k++) {
					if (barrier[k] == count) {
						type = 1;
					}
				}
				if (type == 0) {
					for (var k = 0; k < maxPowerups.length; k++) {
						if (maxPowerups[k] == count) {
							type = 2;
						}
					}
				}
				if (type == 0) {
					for (var k = 0; k < sizePowerups.length; k++) {
						if (sizePowerups[k] == count) {
							type = 3;
						}
					}
				}
				if (type == 0) {
					for (var k = 0; k < killBarrier.length; k++) {
						if (killBarrier[k] == count) {
							type = 4;
						}
					}
				}
				if (type == 0) {
					for (var k = 0; k < bouncyBarrier.length; k++) {
						if (bouncyBarrier[k] == count) {
							type = 5;
						}
					}
				}
				if (type == 0) {
					for (var k = 0; k < teleportIn.length; k++) {
						if (teleportIn[k] == count) {
							type = 6;
						}
					}
				}
				if (type == 0) {
					for (var k = 0; k < teleportOut.length; k++) {
						if (teleportOut[k] == count) {
							type = 7;
						}
					}
				}
				this.initialize(i, j, html_id, type);
				html_id++;
				count++;
			}
		}
	}
	// cx and cy must be inputted to give a starting location for the new circle and html_id needs to be inputted so that its different from any other circles html_id
	function Circle(cx, cy, r, html_id, velX, velY) {
		// function that creates the svg. Used to add circles to playground
		var makeSVG = function(tag, attrs) {
			var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
			for (var k in attrs) {
				el.setAttribute(k, attrs[k]);
			}
			return el;
		}
		// used to check if the two circles touch later on
		// parameters are the x, y, and radius of each circle
		var intersection = function(x0, y0, r0, x1, y1, r1) {
			var a, dx, dy, d, h, rx, ry;
			var x2, y2;
			dx = x1 - x0;
			dy = y1 - y0;
			// Determine the straight-line distance between the centers
			d = Math.sqrt((dy * dy) + (dx * dx));
			// Check for solvability
			if (d > (r0 + r1)) {
				// no solution. circles do not intersect
				return false;
			}
			if (d < Math.abs(r0 - r1)) {
				// no solution. one circle is contained in the other
				return false;
			}
			if (x0 == undefined || y0 == undefined || r0 == undefined || x1 == undefined || y1 == undefined || r1 == undefined) {
				return false;
			}
			return true;
		}
		var detectBarriers = function(x, y, r) {
			for(var i = 0; i < barrier.length; i++) {
				var spot = barrier[i];
				var sX = 0;
				while (spot > 31) {
					spot -= 32;
					sX++;
				}
				sX *= 20;
				sX += 10;
				var sY = spot * 20;
				sY += 10;
				var dy = (y - sY),
				dx = (x - sX);
				var theta = Math.atan2(dy, dx);
				var angle = (((theta * 180) / Math.PI)) % 360;
				angle = (angle < 0) ? 360 + angle : angle;
				angle = Math.round(angle);
				var quadrant = angle % 90;
				if (quadrant > 45) {
					quadrant = 90 - quadrant;
				}
				var dist = Math.sqrt((dy * dy) + (dx * dx));
				if (dist <= (r + squareDist[quadrant])) {
					if (angle <= 315 && angle >= 225) {
						return ["top", sX, sY, 0];
					}
					if (angle <= 225 && angle >= 135) {
						return ["lef", sX, sY, 0];
					}
					if (angle <= 135 && angle >= 45) {
						return ["bot", sX, sY, 0];
					}
					if (angle <= 45 && angle >= 0 || angle <= 360 && angle >= 315) {
						return ["rig", sX, sY, 0];
					}
				}
			}
			for(var i = 0; i < killBarrier.length; i++) {
				var spot = killBarrier[i];
				var sX = 0;
				while (spot > 31) {
					spot -= 32;
					sX++;
				}
				sX *= 20;
				sX += 10;
				var sY = spot * 20;
				sY += 10;
				var dy = (y - sY),
				dx = (x - sX);
				var theta = Math.atan2(dy, dx);
				var angle = (((theta * 180) / Math.PI)) % 360;
				angle = (angle < 0) ? 360 + angle : angle;
				angle = Math.round(angle);
				var quadrant = angle % 90;
				if (quadrant > 45) {
					quadrant = 90 - quadrant;
				}
				var dist = Math.sqrt((dy * dy) + (dx * dx));
				if (dist <= (r + squareDist[quadrant])) {
					return true;
				}
			}
			for(var i = 0; i < teleportIn.length; i++) {
				var spot = teleportIn[i];
				var sX = 0;
				while (spot > 31) {
					spot -= 32;
					sX++;
				}
				sX *= 20;
				sX += 10;
				var sY = spot * 20;
				sY += 10;
				var dy = (y - sY),
				dx = (x - sX);
				var theta = Math.atan2(dy, dx);
				var angle = (((theta * 180) / Math.PI)) % 360;
				angle = (angle < 0) ? 360 + angle : angle;
				angle = Math.round(angle);
				var quadrant = angle % 90;
				if (quadrant > 45) {
					quadrant = 90 - quadrant;
				}
				var dist = Math.sqrt((dy * dy) + (dx * dx));
				if (dist <= (r + squareDist[quadrant])) {
					var a = teleportOut[i];
					var tX = 0;
					while (a > 31) {
						a -= 32;
						tX++;
					}
					tX *= 20;
					tX += 10;
					var tY = a * 20;
					tY += 10;
					return ["teleport", tX, tY];
				}
			}
			for(var i = 0; i < bouncyBarrier.length; i++) {
				var spot = bouncyBarrier[i];
				var sX = 0;
				while (spot > 31) {
					spot -= 32;
					sX++;
				}
				sX *= 20;
				sX += 10;
				var sY = spot * 20;
				sY += 10;
				var dy = (y - sY),
				dx = (x - sX);
				var theta = Math.atan2(dy, dx);
				var angle = (((theta * 180) / Math.PI)) % 360;
				angle = (angle < 0) ? 360 + angle : angle;
				angle = Math.round(angle);
				var quadrant = angle % 90;
				if (quadrant > 45) {
					quadrant = 90 - quadrant;
				}
				var dist = Math.sqrt((dy * dy) + (dx * dx));
				if (dist <= (r + squareDist[quadrant])) {
					if (angle <= 315 && angle >= 225) {
						return ["top", sX, sY, 1];
					}
					if (angle <= 225 && angle >= 135) {
						return ["lef", sX, sY, 1];
					}
					if (angle <= 135 && angle >= 45) {
						return ["bot", sX, sY, 1];
					}
					if (angle <= 45 && angle >= 0 || angle <= 360 && angle >= 315) {
						return ["rig", sX, sY, 1];
					}
				}
			}
			for(var i = 0; i < tips.length; i++) {
				var spot = tips[i];
				var sX = 0;
				while (spot > 31) {
					spot -= 32;
					sX++;
				}
				sX *= 20;
				sX += 10;
				var sY = spot * 20;
				sY += 10;
				var dy = (y - sY),
				dx = (x - sX);
				var dist = Math.sqrt((dy * dy) + (dx * dx));
				if (dist <= (r + squareDist[quadrant])) {
					if (tipSpot == 0 && i == 0) {
						$("#tips").html("Gotta straighten out. Grey squares will kill ya!");
						tipSpot++;
					}
					if (tipSpot == 1 && i == 1) {
						$("#tips").html("SLOW DOWN!!");
						tipSpot++;
					}
					if (tipSpot == 2 && i == 2) {
						$("#tips").html("These orange barriers are very bouncy");
						tipSpot++;
					}
					if (tipSpot == 3 && i == 3) {
						$("#tips").html("If you hadn't guessed it: red makes you fast, blue makes you big");
						tipSpot++;
					}
					if (tipSpot == 4 && i == 4) {
						$("#tips").html("Red bordered squares will teleport you to a blue bordered square. Be careful. Who knows what you'll appear next to");
						tipSpot++;
					}
					if (tipSpot == 5 && i == 5) {
						$("#tips").html("Almost there!");
						tipSpot++;
					}
				}
			}
			return false;
		}
		function getPowerup(x,y,r) {
			for(var i = 0; i < maxPowerups.length; i++) {
				var spot = maxPowerups[i];
				var sX = 0;
				while (spot > 32) {
					spot -= 32;
					sX++;
				}
				sX *= 20;
				sX += 10;
				var sY = spot * 20;
				sY += 10;
				var dy = (y - sY),
				dx = (x - sX);
				var theta = Math.atan2(dy, dx);
				var angle = (((theta * 180) / Math.PI)) % 360;
				angle = (angle < 0) ? 360 + angle : angle;
				angle = Math.round(angle);
				var quadrant = angle % 90;
				if (quadrant > 45) {
					quadrant = 90 - quadrant;
				}
				var dist = Math.sqrt((dy * dy) + (dx * dx));
				if (dist <= (r + squareDist[quadrant])) {
					return {'max': maxPowerups[i]};
				}
			}
			for(var i = 0; i < sizePowerups.length; i++) {
				var spot = sizePowerups[i];
				var sX = 0;
				while (spot > 32) {
					spot -= 32;
					sX++;
				}
				sX *= 20;
				sX += 10;
				var sY = spot * 20;
				sY += 10;
				var dy = (y - sY),
				dx = (x - sX);
				var theta = Math.atan2(dy, dx);
				var angle = (((theta * 180) / Math.PI)) % 360;
				angle = (angle < 0) ? 360 + angle : angle;
				angle = Math.round(angle);
				var quadrant = angle % 90;
				if (quadrant > 45) {
					quadrant = 90 - quadrant;
				}
				var dist = Math.sqrt((dy * dy) + (dx * dx));
				if (dist <= (r + squareDist[quadrant])) {
					return {'size': sizePowerups[i]};
				}
			}
			return false;
		}
		function maxSpeed(velx, vely, maxspeed) {
			if (speedUp == true) {
				maxspeed += .5;
			}
			if (velx > maxspeed) {
				velx = maxspeed;
			} else if (velx < -maxspeed) {
				velx = -maxspeed;
			}
			if (vely > maxspeed) {
				vely = maxspeed;
			} else if (vely < -maxspeed) {
				vely = -maxspeed;
			}
			if (velx < 0.001 && velx > 0) {
				velx = 0;
			}
			if (velx > -0.001 && velx < 0) {
				velx = 0;
			}
			if (vely < 0.001 && vely > 0) {
				vely = 0;
			}
			if (vely > -0.001 && vely < 0) {
				vely = 0;
			}
			return [velx, vely];
		}
		function decelerate(speedx, speedy, decelRate) {
			if (speedx != 0 || speedy != 0) {
				if (speedx != 0) {
					speedx *= decelRate;
				}
				if (speedy != 0) {
					speedy *= decelRate;
				}
				return [speedx, speedy];
			}
			return false;
		}
		function wallBounce(x, y, speedx, speedy, r, bounciness) {
			if (x + r > (SVGwid)) {
				x = SVGwid - r;
				speedx *= -bounciness;
			} else if (x - r < 0) {
				x = r;
				speedx *= -bounciness;
			}
			if (y + r > SVGhei) {
				y = SVGhei - r;
				speedy *= -bounciness;
			} else if (y - r < 0) {
				y = r;
				speedy *= -bounciness;
			}
			return [x, y, speedx, speedy];
		}
		function keyPresses(speedx, speedy, acceleration){
			if (keyPressed[38] == true && keyPressed[39] == true) {
				speedy -= acceleration;
				speedx += acceleration;
			} else if (keyPressed[38] == true && keyPressed[37] == true) {
				speedy -= acceleration;
				speedx -= acceleration;
			} else if (keyPressed[40] == true && keyPressed[39] == true) {
				speedy += acceleration;
				speedx += acceleration;
			} else if (keyPressed[40] == true && keyPressed[37] == true) {
				speedy += acceleration;
				speedx -= acceleration;
			} else if (keyPressed[39] == true && keyPressed[37] != true) {
				speedx += acceleration;
			} else if (keyPressed[37] == true && keyPressed[39] != true) {
			  	speedx -= acceleration;
			} else if (keyPressed[38] == true && keyPressed[40] != true) {
				speedy -= acceleration;
			} else if (keyPressed[40] == true && keyPressed[38] != true) {
				speedy += acceleration;
			}
			return [speedx, speedy];
		}
		function sizeChange(change) {
			var userBall = document.getElementById(html_id);
			if (change == 0){
				userBall.setAttribute('r', 20);
			} else {
				userBall.setAttribute('r', 9.9);
			}
		}
		function viewboxTransition(x, y, x2, y2) {
			var tranX = x - x2;
			var tranY = y - y2;
			tranX /= 300;
			tranY /= 300;
			var newX = x;
			var newY = y;
			var view = document.getElementById("svg");
			var i = 0;
			var tranInterval = setInterval(function() {
				if (i > 299) {
					clearInterval(tranInterval);
				}
				newX -= tranX;
				newY -= tranY;
				i++;
				view.setAttribute('viewBox', newX + " " + newY + " 300 300");
			}, 10);
			
		}
		// stores info on location, size of ball, and id for easy use passing info around
		this.info = { cx: cx,  cy: cy, r: r, html_id: html_id};
		// function to create new instances of class
		this.initialize = function() {
			// velocity for direction of ball
			this.info.velocity = {
				x: velX,
				y: velY
			}
			// first circle (html_id == 0) is red
			if (html_id == 0) {
				var circle = makeSVG('circle',
					{	cx: this.info.cx,
						cy: this.info.cy,
						r: this.info.r,
						id: html_id,
						style: 'fill: red; stroke: black; stroke-width: .5'
				});
			} else {
				// second circle (html_id != 0) is blue
				var circle = makeSVG('circle',
					{	cx: this.info.cx,
						cy: this.info.cy,
						r: this.info.r,
						id: html_id,
						style: 'fill: blue; stroke: black; stroke-width: .5'
				});
			}
			// adds var circle to svg
			document.getElementById('svg').appendChild(circle);
		}
		this.death = function() {
			deaths++;
			$('#deathCount').html('Deaths: ' + deaths);
			if (deaths == 1) {
				$("#tips").html("You died... Dying brings you back the beginning. No checkpoints...");	
			}
			if (deaths == 5) {
				$("#tips").html("Don't worry! You'll figure it out eventually! Maybe..");	
			}
			if (deaths == 15) {
				$("#tips").html("Maybe this game isn't for you..");	
			}
			if (deaths == 25) {
				$("#tips").html("You probably should have quit long ago....");	
			}
			if (deaths == 50) {
				$("#tips").html("Why the hell are you still playing this shitty game??");	
			}
			if (deaths == 75) {
				$("#tips").html("Well.... At least you're persistent....");	
			}
			if (deaths == 99) {
				$("#tips").html("Um. Dude.. Just stop... There's no more fun messages after dying... It's over");	
			}
			if (deaths == 100) {
				$("#tips").html("I lied");	
			}
			if (deaths == 101) {
				$("#tips").html("This is way too many deaths. If anybody actually gets this far, here is a video walkthrough of this game <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>Tutorial</a>");	
			}
			var el = document.getElementById(html_id);
			this.info.cx = SVGwid / 4;
			this.info.cy = SVGhei / 2;
			this.info.velocity.x = 0;
			this.info.velocity.y = 0;
			this.info.r = 9.9;
			el.setAttribute('cx', this.info.cx);
			el.setAttribute('cy', this.info.cy);
			el.setAttribute('r', this.info.r);
			$interval.cancel(mainInterval);
			$('#reset').show();
			$('#resetButton').show()
		}
		// update function does bulk of calculations. Is called by playground.loop
		this.update = function(time, maxspeed, acceleration, deceleration, bounciness) {
			// grabs circle element of the object this function is called from
			var el = document.getElementById(html_id);
			if (this.info.html_id == circleId) {
				// max speed>>>
				newspeed = maxSpeed(this.info.velocity.x, this.info.velocity.y, maxspeed);
				this.info.velocity.x = newspeed[0];
				this.info.velocity.y = newspeed[1];
				// <<<max speed
				// steady deceleration>>>
				newdecel = decelerate(this.info.velocity.x, this.info.velocity.y, deceleration);
				if (newdecel != false) {
					this.info.velocity.x = newdecel[0];
					this.info.velocity.y = newdecel[1];
				}
				// <<< steady deceleration
				// bounce off the edges>>>
				bounce = wallBounce(this.info.cx, this.info.cy, this.info.velocity.x, this.info.velocity.y, this.info.r, bounciness);
				this.info.cx = bounce[0];
				this.info.cy = bounce[1];
				this.info.velocity.x = bounce[2];
				this.info.velocity.y = bounce[3];
				// <<<bounce off the edges
				// square x, square y, circle x, circle y
				var collision = detectBarriers(this.info.cx, this.info.cy, this.info.r);
				if (collision != false) {
					if (collision == true) {
						var that = this;
						that.death();
					}
					if (collision[0] == "teleport") {
						$interval.cancel(mainInterval);
						var view = document.getElementById("svg");
						var x = this.info.cx - 150;
						var y = this.info.cy - 150;
						view.setAttribute('viewBox', x + " " + y + " 300 300");
						this.info.cx = collision[1];
						this.info.cy = collision[2];
						var x2 = this.info.cx - 150;
						var y2 = this.info.cy - 150;
						viewboxTransition(x, y, x2, y2);
						setTimeout(function() {
							mainInterval = $interval(playground.loop, 10);
						}, 2991);
					}
					if (collision[3] == 1) {
						console.log('bouncehit');
						if (collision[0] == "top") {
							var sY = collision[2];
							this.info.cy = sY - this.info.r;
							this.info.cy -= 10;
							this.info.velocity.y = this.info.velocity.y * (-bounciness - 1.5);
						}
						if (collision[0] == "bot") {
							var sY = collision[2];
							this.info.cy = sY + this.info.r;
							this.info.cy += 10;
							this.info.velocity.y = this.info.velocity.y * (-bounciness - 1.5);
						}
						if (collision[0] == "rig") {
							var sX = collision[1];
							this.info.cx = sX + this.info.r;
							this.info.cx += 10;
							this.info.velocity.x = this.info.velocity.x * (-bounciness - 1.5);
						}
						if (collision[0] == "lef") {
							var sX = collision[1];
							this.info.cx = sX - this.info.r;
							this.info.cx -= 10;
							this.info.velocity.x = this.info.velocity.x * (-bounciness - 1.5);
						}
					}
					if (collision[3] == 0) {
						console.log('hit');
						if (collision[0] == "top") {
							var sY = collision[2];
							this.info.cy = sY - this.info.r;
							this.info.cy -= 10;
							this.info.velocity.y = this.info.velocity.y * -bounciness;
						}
						if (collision[0] == "bot") {
							var sY = collision[2];
							this.info.cy = sY + this.info.r;
							this.info.cy += 10;
							this.info.velocity.y = this.info.velocity.y * -bounciness;
						}
						if (collision[0] == "rig") {
							var sX = collision[1];
							this.info.cx = sX + this.info.r;
							this.info.cx += 10;
							this.info.velocity.x = this.info.velocity.x * -bounciness;
						}
						if (collision[0] == "lef") {
							var sX = collision[1];
							this.info.cx = sX - this.info.r;
							this.info.cx -= 10;
							this.info.velocity.x = this.info.velocity.x * -bounciness;
						}
					}
				}
				var powerup = getPowerup(this.info.cx, this.info.cy, this.info.r);
				if (powerup != false) {
					if (powerup['max'] != null) {
						var index = maxPowerups.indexOf(powerup['max']);
						maxPowerups.splice(index, 1);
						speedUp = true;
						el.setAttribute('style', 'fill: green; stroke: black; stroke-width: .5');
						setTimeout(function(){
							speedUp = false;
							el.setAttribute('style', 'fill: red; stroke: black; stroke-width: .5');
							setTimeout(function(){
								var id = powerup['max'] + 100;
								var back = document.getElementById(id);
								maxPowerups.push(powerup['max']);
								back.setAttribute('style', 'fill: red; fill-opacity: 1');
							}, 10000);
						}, 10000);
						var id = powerup['max'] + 100;
						var back = document.getElementById(id);
						back.setAttribute('style', 'fill: white; fill-opacity: 0; stroke-width: .3; stroke: lightgrey');
					}
					if (powerup['size'] != null) {
						sizeChange(0);
						var that = this;
						if (this.info.r == 9.9) {
							this.info.r = 20;
							setTimeout(function(){
								sizeChange(1);
								that.info.r = 9.9;
							}, 10000);
						}
					}
				}
				// movement from key presses>>>
				keyMove = keyPresses(this.info.velocity.x, this.info.velocity.y, acceleration);
				this.info.velocity.x = keyMove[0];
				this.info.velocity.y = keyMove[1];
				// movement from key presses>>>
				// hit points (not completely accurate)>>>
				hitpoints['circlex'] = this.info.cx;
				hitpoints['circley'] = this.info.cy;
				// <<<hit points (not completely accurate)
				var view = document.getElementById("svg");
				var x = this.info.cx - 150;
				var y = this.info.cy - 150;
				view.setAttribute('viewBox', x + " " + y + " 300 300");
			}
			// sets new location for object with regards to velocity>>>
			this.info.cx = this.info.cx + this.info.velocity.x * time;
			this.info.cy = this.info.cy + this.info.velocity.y * time;
			//<<< sets new location for object with regards to velocity
			//sets the location of the circle that this function was called from
			el.setAttribute('cx', this.info.cx);
			el.setAttribute('cy', this.info.cy);
		}
		// if the class is called it runs initialize so a new circle is created
		this.initialize();
	}
	// end of class circle
	// no parameters needed. will run on page load and is called further down page
	function PlayGround() {
		// for the score. it is called from an interval
		this.score = function() {
			score++;
			document.getElementById('score').innerHTML = 'Score: ' + score;
		}
		// calls new Circle, creating a new instance of class circle. also adds that object to circles object with index of its html_id
		this.createNewCircle = function(x,y,r,html_id, velX, velY) {
			var new_circle = new Circle(x,y,r,html_id, velX, velY);
			circles[html_id] = new_circle;
		}
		// main loop for all game function. is called from mainInterval
		this.loop = function() {
			// var start = new Date().getTime();
			var count = 0;
			// runs the class circle update function for each circle in the circles array
			for (circle in circles) {
				// params: time, maxspeed, acceleration, deceleration, bounciness
				circles[circle].update(1,1, 0.03, 0.997, 0.65);
				count++;
			}
			// var end = new Date().getTime();
			// var log = end - start;
			// console.log(log);
		}
		// creates the circleId or html_id of the users circle so that its one more than the previous users circle
		circleId = 0
		// creates users circle in the middle of the map with its new id
		// params: x location, y location, radius, id, x velocity, y velocity
		setTimeout(function() {
			playground.createNewCircle(SVGwid / 4, SVGhei / 2, 9.9, circleId, 0, 0);	
		}, 1000);
	}
	// end of class playground
	// key strokes are recorded in an array. example: if the up key is pressed and everything is not the circle will move up. if both the left and up key are pressed, the circle will move diagonally rather than moving up when an up is detected and then left when a left is detected
	// needed for key movements>>>
	document.addEventListener('keydown', keyDownTextField, false);
	document.addEventListener('keyup', keyUpTextField, false);
	function keyDownTextField(e) {
		var keyCode;
		if (e != undefined) {
			e.preventDefault();
			keyCode = e.keyCode;
			keyPressed[keyCode] = true;
		}
	}
	function keyUpTextField(e) {
		var keyCode = e.keyCode;
		keyPressed[e.keyCode] = false;
		keyDownTextField();
	}
	$('#up').on( "mousedown touchstart", function(e){
		e.preventDefault();
		keyPressed[38] = true;
		$('#up').css('opacity', '0.7');
		$('#up').css('box-shadow', 'none');
		$('#up').css('-webkit-box-shadow', 'none');
		$('#up').css('-moz-box-shadow', 'none');
		$('#up').css('background-color', 'black');
	})
	$('#down').on( "mousedown touchstart", function(e){
		e.preventDefault();
		keyPressed[40] = true;
		$('#down').css('opacity', '0.7');
		$('#down').css('box-shadow', 'none');
		$('#down').css('-webkit-box-shadow', 'none');
		$('#down').css('-moz-box-shadow', 'none');
		$('#down').css('background-color', 'black');
	})
	$('#left').on( "mousedown touchstart", function(e){
		e.preventDefault();
		keyPressed[37] = true;
		$('#left').css('opacity', '0.7');
		$('#left').css('box-shadow', 'none');
		$('#left').css('-webkit-box-shadow', 'none');
		$('#left').css('-moz-box-shadow', 'none');
		$('#left').css('background-color', 'black');
	})
	$('#right').on( "mousedown touchstart", function(e){
		e.preventDefault();
		keyPressed[39] = true;
		$('#right').css('opacity', '0.7');
		$('#right').css('box-shadow', 'none');
		$('#right').css('-webkit-box-shadow', 'none');
		$('#right').css('-moz-box-shadow', 'none');
		$('#right').css('background-color', 'black');
	})
	$('#up').on( "mouseup touchend", function(e){
		e.preventDefault();
		keyPressed[38] = false;
		$('#up').css('opacity', '0.5');
		$('#up').css('box-shadow', 'inset 0 0 10px #000000');
		$('#up').css('-webkit-box-shadow', 'inset 0 0 10px #000000');
		$('#up').css('-moz-box-shadow', 'inset 0 0 10px #000000');
		$('#up').css('background-color', 'lightgrey');
	})
	$('#down').on( "mouseup touchend", function(e){
		e.preventDefault();
		keyPressed[40] = false;
		$('#down').css('opacity', '0.5');
		$('#down').css('box-shadow', 'inset 0 0 10px #000000');
		$('#down').css('-webkit-box-shadow', 'inset 0 0 10px #000000');
		$('#down').css('-moz-box-shadow', 'inset 0 0 10px #000000');
		$('#down').css('background-color', 'lightgrey');
	})
	$('#left').on( "mouseup touchend", function(e){
		e.preventDefault();
		keyPressed[37] = false;
		$('#left').css('opacity', '0.5');
		$('#left').css('box-shadow', 'inset 0 0 10px #000000');
		$('#left').css('-webkit-box-shadow', 'inset 0 0 10px #000000');
		$('#left').css('-moz-box-shadow', 'inset 0 0 10px #000000');
		$('#left').css('background-color', 'lightgrey');
	})
	$('#right').on( "mouseup touchend", function(e){
		e.preventDefault();
		keyPressed[39] = false;
		$('#right').css('opacity', '0.5');
		$('#right').css('box-shadow', 'inset 0 0 10px #000000');
		$('#right').css('-webkit-box-shadow', 'inset 0 0 10px #000000');
		$('#right').css('-moz-box-shadow', 'inset 0 0 10px #000000');
		$('#right').css('background-color', 'lightgrey');
	})

	// <<<needed for key movements
	$("#gameInfo").hover(function() {
        $("#gameInfo").html("<span style='color: black'>Black Square: Regular Barrier| </span><span style='color: grey'>Grey Square: Death!| </span><span style='color: orange'>Orange Square: Extra Bouncy| </span><span style='color: red'>Red Square: Speed Powerup| </span><span style='color: blue'>Blue Square: Size Powerup| </span><span style='color: white; text-shadow: -1px -1px 0 red, 1px -1px 0 red, -1px 1px 0 red, 1px 1px 0 red;'>Red Outline: Teleport Start| </span><span style='color: white; text-shadow: -1px -1px 0 blue, 1px -1px 0 blue, -1px 1px 0 blue, 1px 1px 0 blue;'>Blue Outline: Teleport End </span></div>");
    	$("#deathCount").hide();
    });
    $("#gameInfo").hover(function() {},
    function(){
        $("#gameInfo").html('Hover for game info');
        $("#deathCount").show();
    });
	$("svg").on("click", "rect", function() {
			edit(this);
	});
	$('#mapLog').on("click", function() {
		console.log("Reg Barrier: " + barrier);
		console.log("Kill Barrier: " + killBarrier);
		console.log("Max Speed Powerup: " + maxPowerups);
		console.log("Big Ball Powerup: " + sizePowerups);
		console.log("Bouncy: " + bouncyBarrier);
		console.log("In: " + teleportIn);
		console.log("Out: " + teleportOut);
		console.log("Tips: " + tips);
	});
	$('#edit').on("click", function() {
		if (allowEdit == false) {
			allowEdit = true;
		} else {
			allowEdit = false;
		}
		$('#editTrue').toggle();
	});
	function edit(that) {
		if (allowEdit == true) {
			var id = that.id - 100;
			var type = 0;
			var back = document.getElementById(that.id);
			for (var i = 0; i < barrier.length; i++) {
				if (barrier[i] == id) {
					var index = barrier.indexOf(id);
					barrier.splice(index, 1);
					type = 1;
					break;
				}
			}
			if (type == 0) {
				for (var i = 0; i < killBarrier.length; i++) {
					if (killBarrier[i] == id) {
						var index = killBarrier.indexOf(id);
						killBarrier.splice(index, 1);
						type = 2;
						break;
					}
				}
			}
			if (type == 0) {
				for (var i = 0; i < maxPowerups.length; i++) {
					if (maxPowerups[i] == id) {
						var index = maxPowerups.indexOf(id);
						maxPowerups.splice(index, 1);
						type = 3;
						break;
					}
				}
			}
			if (type == 0) {
				for (var i = 0; i < sizePowerups.length; i++) {
					if (sizePowerups[i] == id) {
						var index = sizePowerups.indexOf(id);
						sizePowerups.splice(index, 1);
						type = 4;
						break;
					}
				}
			}
			if (type == 0) {
				for (var i = 0; i < bouncyBarrier.length; i++) {
					if (bouncyBarrier[i] == id) {
						var index = bouncyBarrier.indexOf(id);
						bouncyBarrier.splice(index, 1);
						type = 5;
						break;
					}
				}
			}
			if (type == 0) {
				for (var i = 0; i < teleportIn.length; i++) {
					if (teleportIn[i] == id) {
						var index = teleportIn.indexOf(id);
						teleportIn.splice(index, 1);
						type = 6;
						break;
					}
				}
			}
			if (type == 0) {
				for (var i = 0; i < teleportOut.length; i++) {
					if (teleportOut[i] == id) {
						var index = teleportOut.indexOf(id);
						teleportOut.splice(index, 1);
						type = 7;
						break;
					}
				}
			}
			if (type == 0) {
				for (var i = 0; i < tips.length; i++) {
					if (tips[i] == id) {
						var index = tips.indexOf(id);
						tips.splice(index, 1);
						type = 8;
						break;
					}
				}
			}
			if (type == 0) {
				barrier.push(id);
				back.setAttribute('style', 'fill: black; fill-opacity: 1');
			}
			if (type == 1) {
				killBarrier.push(id);
				back.setAttribute('style', 'fill: grey; fill-opacity: 1');				
			}
			if (type == 2) {
				maxPowerups.push(id);
				back.setAttribute('style', 'fill: red; fill-opacity: 1');
			}
			if (type == 3) {
				sizePowerups.push(id);
				back.setAttribute('style', 'fill: blue; fill-opacity: 1');
			}
			if (type == 4) {
				bouncyBarrier.push(id);
				back.setAttribute('style', 'fill: orange; fill-opacity: 1')
			}
			if (type == 5) {
				teleportIn.push(id);
				back.setAttribute('style', 'fill: white; fill-opacity: 0; stroke: red; stroke-width: 1;')
			}
			if (type == 6) {
				teleportOut.push(id);
				back.setAttribute('style', 'fill: white; fill-opacity: 0; stroke: blue; stroke-width: 1;')
			}
			if (type == 7) {
				tips.push(id);
				back.setAttribute('style', 'fill: green; fill-opacity: 1; stroke-width: .3; stroke: lightgrey');
			}
			if (type == 8) {
				back.setAttribute('style', 'fill: white; fill-opacity: 0; stroke-width: .3; stroke: lightgrey');
			}
		}
	}
	// creates the game areana
	var playground = new PlayGround();
	// param: individual square size
	var background = new BackSquare(20);
	// the important loop that starts all the game functionality
	mainInterval = $interval(playground.loop, 10);
	$('#editTrue').hide();
	$('#reset').hide();
	$('#resetButton').hide()
	$('#resetButton').css( 'cursor', 'pointer' );
	var size = $('body').width();
	var sizeHeight = $('body').height();
	if (size < 768) {
        $('#svg').css("width", size + "px");
        $('#svg').css("height", sizeHeight + "px");
        $('#deathCount').css('margin-top', "190px");
        $('#touchKeys').show();
    } else {
        $('#svg').css("width", size + "px");
        $('#svg').css("height", sizeHeight + "px");
        $('#deathCount').css('margin-top', "120px");
    }
    $(window).resize(function(e) {
        var size = $('body').width();
        if (size < 768) {
            $('#svg').css("width", size + "px");
            $('#svg').css("height", sizeHeight + "px");
            $('#deathCount').css('margin-top', "190px");
        } else {
            $('#svg').css("width", size + "px");
            $('#svg').css("height", sizeHeight + "px");
            $('#deathCount').css('margin-top', "120px");
        }
    });
    $('#resetButton').click(function(){
    	mainInterval = $interval(playground.loop, 10);
    	$('#reset').hide();
		$('#resetButton').hide()
    });
    window.mobileAndTabletcheck = function() {
  		var check = false;
  		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  		return check;
	};
	if (window.mobileAndTabletcheck() == true) {
		$('#touchKeys').show();
		$('#tips').hide();
	} else {
		$('#touchKeys').hide();
	}
	$(window).bind('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
	        $('#mainNa').slideDown();
	    } else {
	    	if ($('#mainNa').is(":visible") == true ) {
		        clearTimeout(gameCtrl.headerTimeout);
		        gameCtrl.headerTimeout = setTimeout(function(){
		        	$('#mainNa').slideUp();
		        }, 1000);
		    }
	    }
        
    });
	//test area
		
	// test area
}
})();
// end of playgroundController
