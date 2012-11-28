/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["physics", "map"], function(physics, map) {
	"use strict";
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}
	}());
	return {
		canvas: {},
		context: {},
		renderList: [],
		mainLoop: null,
		startLoop: function(fn) {
			return fn();
		},
		stopLoop: function(id) {
			cancelAnimationFrame(id);
			return false;
		},
		setup: function(id) {
			this.canvas = document.getElementById(id);
			this.context = this.canvas.getContext('2d');
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			return false;
		},
		animationLoop: function(animation, map, master, messageDiv) {
			var length = animation.renderList.length;
			var thisEntity, i,stop;
			stop = false;
			animation.setup("objects");
			for (i = 0; i < length; i++) {
				thisEntity = animation.renderList[i];
				if (thisEntity.remove) {
					thisEntity.on.destroy(thisEntity);
					animation.renderList.splice(i);
					length = animation.renderList.length;
					i--;
				} else {
					physics(thisEntity, animation.renderList);
					if (thisEntity.data.id === "player") {
						animation.setup("player");
						if(thisEntity.data.gameEnd) {
							stop = thisEntity;
						}
						thisEntity.on.animate(thisEntity, master.environment, animation, map, messageDiv);
						animation.context.fillStyle = "rgba(0,0,0,0.5)";
						animation.context.fillRect(map.offset(thisEntity.data.x - thisEntity.data.frameData.cpx, "X"), map.offset(thisEntity.data.y - thisEntity.data.frameData.cpy, "Y"), thisEntity.data.w, thisEntity.data.h)
						// animation.context.fillStyle = "red";
						// animation.context.fillRect(thisEntity.data.tileX*32,thisEntity.data.tileY*32,thisEntity.data.w,thisEntity.data.h)
						animation.setup("objects");
					} else {
						thisEntity.on.animate(thisEntity, master.environment, animation, map, messageDiv);
						animation.context.fillStyle = "rgba(0,0,0,0.5)";
						animation.context.fillRect(map.offset(thisEntity.data.x - thisEntity.data.frameData.cpx, "X"), map.offset(thisEntity.data.y - thisEntity.data.frameData.cpy, "Y"), thisEntity.data.w, thisEntity.data.h)
						// animation.context.fillStyle = "red";
						// animation.context.fillRect(thisEntity.data.tileX*32,thisEntity.data.tileY*32,thisEntity.data.w,thisEntity.data.h)
					}
				}
			}
			map.animate(animation);
			return stop;
		}
	};
});