/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["animation", "input", "map", "entity", "load"], function(animation, input, map, entity, load) {
	"use strict";
	load.ready();
	return {
		walk: function(self) {
			if (self.data.event.stop) {
				self.data.event.stop = false;
				return true;
			}
			if (self.data.event.climb && !self.data.event.fall) {
				return true;
			}
			if (input.keys.left || input.keys.right) {
				self.data.event.walk = true;
				self.data.event.stand = false;
			} else {
				self.data.event.walk = false;
				self.data.event.stand = true;
			}
			if (input.keys.left && input.keys.right) {
				if (self.data.direction.right || self.data.direction.left) {
					self.counter = 0;
				}
			} else if (self.data.event.walk) {
					// console.log(self.data.blocked.left, self.data.blocked.right)
				if (input.keys.right === true && self.data.blocked.right === false) {
					self.data.moving = true;
					self.data.x = self.data.x + self.data.walkSpeed;
				} else if (input.keys.left === true && self.data.blocked.left === false) {
					self.data.moving = true;
					self.data.x = self.data.x - self.data.walkSpeed;
				}

			}
			if (input.keys.right === false && self.data.direction.right === true) {
				self.counter = 0;
			}
			if (input.keys.left === false && self.data.direction.left === true) {
				self.counter = 0;
			}
			return false;
		},
		moveDoors: function(self) {
			if (self.data.travel) {
				if (self.data.tileX === self.data.targetDoor.x && self.data.tileY === self.data.targetDoor.y) {
					self.data.x = self.data.targetDoor.x * 32 + self.data.frameData.cpx;
					self.data.y = self.data.targetDoor.y * 32 + self.data.frameData.cpy;
					self.data.travel = false;
					return true;
				}
				self.data.x += self.data.targetDoor.xSpeed;
				self.data.y += self.data.targetDoor.ySpeed;
			}
			return false;
		},
		door: function(self, door, x, y, map) {
			self.data.coolDown = 10;
			var locked = false;
			if (door.lock) {
				locked = true;
				if (self.data.keys[door.lock]) {
					locked = false;
				} else {
					return false;
				}
			}
			if (door.event !== "door" && !locked) {
				self.data.travel = true;
				var targetDoor = map.matchDoor(x, y);
				self.data.targetDoor.x = targetDoor.x;
				self.data.targetDoor.y = targetDoor.y;
				self.data.targetDoor.xSpeed = Math.floor(((targetDoor.x - self.data.tileX) * 32) / 12);
				self.data.targetDoor.ySpeed = Math.floor(((targetDoor.y - self.data.tileY) * 32) / 12);
			} else if (door.event === "door" && !locked) {
				map.removeDoor(x, y);
			}
			return false;
		},
		climb: function(self, map) {
			var find = function(list, type) {
				if (list) {
					for (var i = 0; i < list.length; i++) {
						if (list[i].event) {
							if (list[i].event.indexOf(type) > -1) {
								return list[i];
							}
						}
					}
				}
				return false;
			};
			var climbUp = function(self) {
				if(self.data.blocked.up) {
					return false;
				}
				self.data.moving = true;
				self.data.fallRate = 0;
				self.data.jumpRate = self.data.jumpForce;
				self.data.action = "climb";
				self.data.event.jump = false;
				self.data.event.fall = false;
				self.data.y = self.data.y - 1;
				self.data.onLand = false;
				self.counter++;
				self.data.event.climb = true;
				return false;
			};
			var climDown = function(self) {
				if(self.data.blocked.down) {
					return false;
				}
				self.data.moving = true;
				self.data.fallRate = 0;
				self.data.jumpRate = self.data.jumpForce;
				self.data.action = "climb";
				self.data.event.jump = false;
				self.data.event.fall = false;
				self.data.y = self.data.y + 1;
				self.data.onLand = false;
				self.counter++;
				self.data.event.climb = true;
				return false;
			};
			var fall = function(self) {
				if (!self.data.onLand && self.data.event.climb) {
					// self.data.event.climb = false;
					self.data.event.fall = true;
				}
				return false;
			};
			var x = self.data.tileX;
			var y = self.data.tileY;
			var current = map.events(x, y);
			var above = map.events(x, y - 1);
			var below = map.events(x, y + 1);

			if (input.keys.up === true) {
				if ((self.data.event.jump || self.data.event.fall) && !self.data.event.climb) {
					climbUp(self);
				} else if (find(current, "ladder") && !find(above, "ladder")) {
					climbUp(self);
				} else if (find(current, "ladder") && find(above, "ladder")) {
					climbUp(self);
				} else if (!find(current, "ladder") && find(below, "ladder") && self.data.event.climb) {
					climbUp(self);
				} else if (!find(current, "ladder") && !find(above, "ladder")) {
					fall(self);
				} else {
					fall(self);
				}
			} else if (input.keys.down === true) {
				if (find(current, "wall") && find(current, "ladder") && find(below, "ladder")) {
					climDown(self);
				} else if (!find(current, "ladder") && find(below, "ladder")) {
					climDown(self);
				} else if (find(current, "ladder") && find(below, "ladder")) {
					climDown(self);
				} else if (find(current, "ladder") && !find(below, "ladder")) {
					fall(self);
				} else {
					fall(self);
				}
			} else if (input.keys.space) {
				fall(self);
			}
			return false;
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
			return false;
		},
		action: function(self, map) {
			if (self.data.coolDown) {
				return false;
			}
			var find = function(list, type) {
				if (list) {
					for (var i = 0; i < list.length; i++) {
						if (list[i].event) {
							if (list[i].event.indexOf(type) > -1) {
								return list[i];
							}
						}
					}
				}
				return false;
			};
			var collideData, data, current, below;
			var x = self.data.tileX;
			var y = self.data.tileY;
			current = map.events(x, y);
			below = map.events(x, y + 1);
			if (find(current, "door")) {
				self.on.door(self, find(current, "door"), x, y, map);
			} else {
				if (find(current, "ladder") || find(below, "ladder")) {
					self.on.climb(self, map);
				} else {
					if (self.data.direction.left) {
						x = x - 1;
					} else if (self.data.direction.right) {
						x = x + 1;
					}
					collideData = map.events(x, y);
					data = find(collideData, "door");
					// to doing the wrong action on a background door, we need to make sure this is an inline door.
					if (data && data.event === "door") {
						self.on.door(self, data, x, y, map);
					}
				}
			}
			return false;
		},
		moveMap: function(self, environment, map) {
			var worldData = environment.world.data;
			if (self.data.x < worldData.minOffset) {
				worldData.offsetX = worldData.minOffset;
			} else if (self.data.x + worldData.minOffset > worldData.maxOffsetX) {
				worldData.offsetX = worldData.maxOffsetX - worldData.minOffset;
			} else {
				worldData.offsetX = self.data.x;
			}
			if (self.data.y < worldData.minOffset) {
				worldData.offsetY = worldData.minOffset;
			} else if (self.data.y + worldData.minOffset > worldData.maxOffsetY) {
				worldData.offsetY = worldData.maxOffsetY - worldData.minOffset;
			} else {
				worldData.offsetY = self.data.y;
			}
			map.recalculate();
			return false;
		},
		jump: function(self, environment) {
			if (!input.keys.space || self.data.jumpRate >= 0) {
				self.data.event.jump = false;
				self.data.event.fall = true;
			} else {
				self.data.moving = true;
				self.data.onLand = false;
				self.data.action = "jump";
				self.data.event.jump = true;
				self.data.y += Math.floor(2 * self.data.jumpRate);
				self.data.jumpRate += environment.world.data.gravity;
			}
			return false;
		},
		fall: function(self, environment) {
			// console.log(self.data.y)
			self.data.moving = true;
			self.data.action = "fall";
			self.data.event.fall = true;
			// self.data.event.climb = false;
			self.data.event.jump = false;
			self.data.y += Math.floor(2 * self.data.fallRate);
			self.data.fallRate += environment.world.data.gravity;
			return false;
		},
		land: function(self) {
			// console.log("land")
			self.data.action = "land";
			self.data.onLand = true;
			self.data.event.jump = false;
			self.data.event.fall = false;
			self.data.event.climb = false;
			self.data.fallRate = 0;
			self.data.jumpRate = self.data.jumpForce;
			return false;
		},
		animate: function(self, environment, context, map) {
			self.data.moving = false;
			if (self.data.travel) {
				self.on.moveDoors(self, map);
				self.on.resetCollisions(self, context);
				self.on.moveMap(self, environment, map);
				return false;
			}
			if (input.keys.left && input.keys.right) {
				self.data.action = self.data.action;
			} else if (input.keys.left || input.keys.right) {
				if (input.keys.left) {
					self.data.lastDirection = "left";
				}
				if (input.keys.right) {
					self.data.lastDirection = "right";
				}
				self.data.action = "walk";
			}
			if(self.data.event.climb) {
				self.data.action = "climb";
			}
			self.data.direction.left = self.data.lastDirection === "left";
			self.data.direction.right = self.data.lastDirection === "right";
			if ((self.data.event.action || input.keys.up || input.keys.down) && self.data.event.climb === false) {
				self.on.action(self, map);
			}
			if (self.data.event.fall || (!self.data.onLand && !self.data.event.climb && !self.data.event.jump)) {
				// console.log("fall")
				self.on.fall(self, environment);
			} else if (self.data.event.climb) {
				self.on.climb(self, map);
			} else if (self.data.event.jump || input.keys.space) {
				self.on.jump(self, environment);
			}
			if (self.data.event.walk || input.keys.left || input.keys.right) {
				self.on.walk(self);
			}
			if (self.animations[self.data.action].speed > 0 && self.data.event.climb === false) {
				self.counter++;
			}
			var speed = self.animations[self.data.action].speed;
			var index = Math.floor(self.counter / speed);
			if (index > self.animations[self.data.action].frames.length - 1 || speed === 0) {
				index = 0;
				self.counter = 0;
			}
			var frameData = self.data.frameData = self.animations[self.data.action].frames[index];
			if (self.data.direction.left === true) {
				if (!self.data.isFlipped) {
					context.save();
					context.scale(-1, 1);
					context.translate(-context.canvas.width, 0);
					self.data.isFlipped = true;
				}
				context.drawImage(self.image, frameData.x, frameData.y, frameData.w, frameData.h, context.canvas.width - map.offset(self.data.x - frameData.cpx, "X") - frameData.w, map.offset(self.data.y - frameData.cpy, "Y"), frameData.w, frameData.h);
			} else {
				context.drawImage(self.image, frameData.x, frameData.y, frameData.w, frameData.h, map.offset(self.data.x - frameData.cpx, "X"), map.offset(self.data.y - frameData.cpy, "Y"), frameData.w, frameData.h);
			}
			self.on.moveMap(self, environment, map);
			self.on.resetCollisions(self, context);
			return false;
		},
		collideBottom: function(self, x, y, collideTarget) {
			// console.log("bottom")
			if (self.data.event.fall) {
				// console.log(y*32,(y*32) - (self.data.h-self.data.frameData.cpy), (self.data.h-self.data.frameData.cpy))
				self.data.y = (y*32) - (self.data.h-self.data.frameData.cpy);
				// console.log(self.data.y,y*32)
				self.on.land(self);
			}
			self.data.onLand = true;
			self.data.blocked.down = true;
			return false;
		},
		collideTop: function(self, x, y, collideTarget) {
			if (self.data.event.jump) {
				// self.data.y = (target.y * 32) +32+20;
				self.data.event.jump = false;
				self.data.event.fall = true;
				self.data.action = "fall";
			}
			self.data.blocked.up = true;
			return false;
		},
		collideRight: function(self, x, y, collideTarget) {
			self.data.action = "stand";
			self.data.event.walk = false;
			self.data.event.stand = true;
			self.data.blocked.right = true;
			return false;
		},
		collideLeft: function(self, x, y, collideTarget) {
			// self.data.x = (x*32) - (self.data.w-self.data.frameData.cpx);
			self.data.action = "stand";
			self.data.event.walk = false;
			self.data.event.stand = true;
			self.data.blocked.left = true;
			return false;
		},
		// everything to be done after the sprite has been animated.
		resetCollisions: function(self, context) {
			// console.log("reset")
			self.data.action = "stand";
			self.data.onLand = false;
			self.data.blocked.left = false;
			self.data.blocked.right = false;
			self.data.blocked.up = false;
			self.data.blocked.down = false;
			if (self.data.isFlipped) {
				context.restore();
				self.data.isFlipped = false;
			}
			if (self.data.coolDown > 0) {
				self.data.coolDown--;
			}
			if (self.data.coolDown < 0) {
				self.data.coolDown = 0;
			}
			self.on.parseTilePosition(self);
			return false;
		}
	};
});