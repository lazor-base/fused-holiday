/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["animation", "input", "map", "load"], function(animation, input, map, load) {
	"use strict";
	load.ready();
	return {
		animate: function(self, environment, animation, map) {
			// self.counter++;
			var frameData = self.data.frameData;
			animation.context.drawImage(self.image, self.data.frameData.x, self.data.frameData.y, self.data.frameData.w, self.data.frameData.h, map.offset(self.data.x - frameData.cpx, "X"), map.offset(self.data.y - frameData.cpy, "Y"), self.data.frameData.w, self.data.frameData.h);
			self.on.resetCollisions(self);
		},
		collect: function(self, collideTarget) {
			if (collideTarget.data && collideTarget.data.id === "player") {
				self.remove = true;
				collideTarget.data.keys[self.data.id] = true;
			}
		},
		destroy:function() {

		},
		collideBottom: function(self, x, y, collideTarget) {
			self.on.collect(self, collideTarget);
		},
		collideTop: function(self, x, y, collideTarget) {
			self.on.collect(self, collideTarget);
		},
		collideRight: function(self, x, y, collideTarget) {
			self.on.collect(self, collideTarget);
		},
		collideLeft: function(self, x, y, collideTarget) {
			self.on.collect(self, collideTarget);
		},
		parseTilePosition: function(self) {
			var round = function(number) {
				var num = Math.round(number / 32);
				return num;
			};
			var speed = self.animations[self.data.action].speed;
			var counter = self.counter;
			var index = Math.floor(counter / speed);
			if (index > self.animations[self.data.action].frames.length - 1 || speed === 0) {
				index = 0;
				self.counter = 0;
			}
			self.data.frameData = self.animations[self.data.action].frames[index];
			self.data.tileX = round(self.data.x - self.data.frameData.cpx);
			self.data.tileY = round(self.data.y - self.data.frameData.cpy);
		},
		// everything to be done after the sprite has been animated.
		resetCollisions: function(self) {
			self.data.action = "idle";
			self.data.onLand = false;
			self.data.direction.left = false;
			self.data.direction.right = false;
			self.data.direction.up = true;
			self.data.direction.down = true;
			if (!self.data.event.drag) {
				self.data.blocked.left = false;
				self.data.blocked.right = false;
			}
			self.data.event.drag = false;
			self.data.blocked.up = false;
			self.data.blocked.down = false;
			if (self.data.isFlipped) {
				animation.context.restore();
				self.data.isFlipped = false;
			}
			self.on.parseTilePosition(self);
		}
	};
});