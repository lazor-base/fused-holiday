/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["animation", "input", "map"], function(animation, input, map) {
	"use strict";
	return {
		animate: function(self, environment, animation, map) {
			if (self.data.event.fall || !self.data.onLand) {
				self.on.fall(self, environment);
			}
			if (self.data.event.move) {
				self.on.move(self);
			}
			var frameData = self.data.frameData;
			animation.context.drawImage(self.image, self.data.frameData.x, self.data.frameData.y, self.data.frameData.w, self.data.frameData.h, map.offset(self.data.x - frameData.cpx, "X"), map.offset(self.data.y - frameData.cpy, "Y"), self.data.w, self.data.h);
		},
		move: function(self) {
			if (self.data.direction.right === true && self.data.blocked.right === false) {
				self.data.x = self.data.x + self.data.moveSpeed;
			} else if (self.data.direction.left === true && self.data.blocked.left === false) {
				self.data.x = self.data.x - self.data.moveSpeed;
			}
		},
		fall: function(self, environment) {
			self.data.event.drag = false;
			self.data.event.fall = true;
			self.data.direction.up = false;
			self.data.direction.down = true;
			self.data.y += Math.floor(2 * self.data.fallRate);
			self.data.fallRate += environment.world.data.gravity;

		},
		land: function(self) {
			self.data.direction.down = false;
			self.data.onLand = true;
			self.data.event.fall = false;
			self.data.fallRate = 0;
		},
		drag: function(self, left, right) {
			self.data.event.drag = true;
			if (left && right) {
				self.data.direction.left = left;
				self.data.direction.right = right;
			}
			if(left && self.data.blocked.left && self.data.collideTargetLeft === "player") {
				self.data.blocked.left = false;
			} else if(right && self.data.blocked.right && self.data.collideTargetRight === "player") {
				self.data.blocked.right = false;
			}
		},
		push: function(self, direction) {
			if (self.data.blocked[direction] === false) {
				self.data.direction[direction] = true;
				if (direction === "left") {
					self.data.x = self.data.x - self.data.moveSpeed;
				} else {
					self.data.x = self.data.x + self.data.moveSpeed;
				}
			}
		},
		collideBottom: function(self, x, y, collideTarget) {
			if (self.data.event.fall) {
				self.data.y = y - (self.data.h - self.data.frameData.cpy);
				self.on.land(self);
			}
			self.data.onLand = true;
			self.data.blocked.down = true;
		},
		collideTop: function(self, x, y, collideTarget) {
			self.data.blocked.up = true;
		},
		collideRight: function(self, x, y, collideTarget) {
			if (collideTarget.data && collideTarget.data.id === "player") {
				self.data.collideTargetRight = "player";
			}

			// self.data.event.move = true;
			// self.data.direction.left = true;
			self.data.blocked.right = true;
		},
		collideLeft: function(self, x, y, collideTarget) {
			if (collideTarget.data && collideTarget.data.id === "player") {
				self.data.collideTargetLeft = "player";
			}

			// self.data.event.move = true;
			// self.data.direction.right = true;
			self.data.blocked.left = true;
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
			self.data.blocked.left = false;
			self.data.blocked.right = false;
			self.data.event.move = false;
			self.data.event.drag = false;
			self.data.blocked.up = false;
			self.data.blocked.down = false;
			self.data.collideTargetRight = "empty";
			self.data.collideTargetLeft = "empty";
			if (self.data.isFlipped) {
				animation.context.restore();
				self.data.isFlipped = false;
			}
			self.on.parseTilePosition(self);
		}
	};
});