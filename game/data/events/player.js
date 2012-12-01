/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["animation", "input", "map", "entity"], function(animation, input, map, entity) {
	"use strict";
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
				if (input.keys.right === true && self.data.blocked.right === false) {
					self.data.moving = true;
					self.data.x = self.data.x + self.data.moveSpeed;
				} else if (input.keys.left === true && self.data.blocked.left === false) {
					self.data.moving = true;
					self.data.x = self.data.x - self.data.moveSpeed;
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
				if (self.data.travelTime === 0) {
					self.data.x = self.data.targetDoor.x * 32 + self.data.frameData.cpx;
					self.data.y = self.data.targetDoor.y * 32 + self.data.frameData.cpy;
					self.data.travel = false;
					return true;
				}
				self.data.travelTime--;
				self.data.x += self.data.targetDoor.xSpeed;
				self.data.y += self.data.targetDoor.ySpeed;
			}
			return false;
		},
		door: function(self, door, x, y, map, messageDiv) {
			self.data.coolDown = 10;
			var locked = false;
			if (door.lock) {
				locked = true;
				if (self.data.keys[door.lock]) {
					locked = false;
				} else {
					messageDiv.textContent = "Key: " + door.lock + " needed!";
					return false;
				}
			}
			if (door.event !== "door" && !locked) {
				self.data.openedDoor = true;
				self.data.travel = true;
				var targetDoor = map.matchDoor(x, y);
				self.data.targetDoor.x = targetDoor.x;
				self.data.targetDoor.y = targetDoor.y;
				self.data.travelTime = Math.floor(((targetDoor.x * 32) - self.data.x) / (Math.floor(((targetDoor.x - self.data.tileX) * 32) / 12)));
				self.data.targetDoor.xSpeed = Math.floor(((targetDoor.x - self.data.tileX) * 32) / 12);
				self.data.targetDoor.ySpeed = Math.floor(((targetDoor.y - self.data.tileY) * 32) / 12);
				console.log(self.data.targetDoor.xSpeed,self.data.targetDoor.ySpeed, self.data.travelTime)
			} else if (door.event === "door" && !locked) {
				// messageDiv.textContent = "Door Unlocked!";
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
				if (self.data.blocked.up) {
					// return false;
				}
				self.data.moving = true;
				self.data.fallRate = 0;
				self.data.jumpRate = self.data.jumpForce;
				self.data.action = "climb";
				self.data.event.jump = false;
				self.data.event.fall = false;
				self.data.direction.up = true;
				self.data.y = self.data.y - 1;
				self.data.onLand = false;
				self.counter++;
				self.data.event.climb = true;
				return false;
			};
			var climDown = function(self) {
				if (self.data.blocked.down) {
					// return false;
				}
				self.data.moving = true;
				self.data.fallRate = 0;
				self.data.jumpRate = self.data.jumpForce;
				self.data.action = "climb";
				self.data.event.jump = false;
				self.data.event.fall = false;
				self.data.direction.down = true;
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
		action: function(self, map, messageDiv) {
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
			if (find(current, "door") && !self.data.openedDoor) {
				self.on.door(self, find(current, "door"), x, y, map, messageDiv);
			} else if (find(current, "mapEnd")) {
				self.data.gameEnd = true;
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
					if (data && data.event === "door" && !self.data.openedDoor) {
						self.on.door(self, data, x, y, map, messageDiv);
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
				self.data.direction.up = true;
				self.data.y += Math.floor(2 * self.data.jumpRate);
				self.data.jumpRate += environment.world.data.gravity;
			}
			return false;
		},
		fall: function(self, environment) {
			self.data.moving = true;
			self.data.action = "fall";
			self.data.event.fall = true;
			// self.data.event.climb = false;
			self.data.event.jump = false;
			self.data.direction.up = false;
			self.data.direction.down = true;
			self.data.y += Math.floor(2 * self.data.fallRate);
			self.data.fallRate += environment.world.data.gravity;
			return false;
		},
		land: function(self) {
			self.data.action = "land";
			self.data.onLand = true;
			self.data.event.jump = false;
			self.data.event.fall = false;
			self.data.event.climb = false;
			self.data.direction.down = false;
			self.data.fallRate = 0;
			self.data.jumpRate = self.data.jumpForce;
			return false;
		},
		getBlockId: function(self, target, side) {
			if (target.data && target.data.id === "block" && !self.data.event.jump && !self.data.event.fall) {
				self.data.blockId = target.data.uniqueId;
				self.data.blockSide = side;
			} else {
				self.data.blockId = 0;
			}
			return false;
		},
		drag: function(self, animation) {
			if (self.data.blockId !== 0 && !self.data.event.jump && !self.data.event.fall) {
				self.data.dragged = true;
				self.data.event.drag = true;
				var side = self.data.blockSide;
				var block = entity.getEntity(self.data.blockId, animation);
				if (!block.data.onLand) {
					self.data.event.drag = false;
					self.data.blockId = 0;
					self.on.walk(self);
					return true;
				}
				block.on.drag(block);
				if (side === "left") {
					// self.data.action = "drag";
					if (input.keys.left && input.keys.right) {

					} else if (input.keys.right) {
						block.on.drag(block, false, true);
						if (self.data.blocked.right === false && block.data.blocked.right === false) {
							self.data.direction.right = true;
							self.data.moving = true;
							self.data.x = self.data.x + block.data.moveSpeed;
							block.on.push(block, "right");
						}
					} else if (input.keys.left) {
						block.on.drag(block, true, false);
						block.on.push(block, "left");
						if (self.data.blocked.left === false && block.data.blocked.left === false) {
							self.data.direction.left = true;
							self.data.moving = true;
							self.data.x = self.data.x - block.data.moveSpeed;
						}
					}
				} else if (side === "right") {
					if (input.keys.left && input.keys.right) {

					} else if (input.keys.right) {
						block.on.drag(block, false, true);
						block.on.push(block, "right")
						if (self.data.blocked.right === false && block.data.blocked.right === false) {
							self.data.direction.right = true;
							self.data.moving = true;
							self.data.x = self.data.x + block.data.moveSpeed;
						}

					} else if (input.keys.left) {
						block.on.drag(block, true, false);
						if (self.data.blocked.left === false && block.data.blocked.left === false) {
							self.data.direction.left = true;
							self.data.moving = true;
							self.data.x = self.data.x - block.data.moveSpeed;
							block.on.push(block, "left")
						}
					}
				}
				block.data.blocked.left = false;
				block.data.blocked.right = false;
			} else {
				self.data.event.drag = false;
				self.data.blockId = 0;
				self.on.walk(self);
			}
			return false;
		},
		animate: function(self, environment, animation, map, messageDiv) {
			self.data.moving = false;
			if (self.data.travel) {
				self.on.moveDoors(self, map);
				// self.on.resetCollisions(self, animation);
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
			if (self.data.event.climb) {
				self.data.action = "climb";
			}
			self.data.direction.left = self.data.lastDirection === "left";
			self.data.direction.right = self.data.lastDirection === "right";
			if ((self.data.event.action || input.keys.up || input.keys.down) && self.data.event.climb === false) {
				self.on.action(self, map, messageDiv);
			}
			if (self.data.event.fall || (!self.data.onLand && !self.data.event.climb && !self.data.event.jump)) {
				self.on.fall(self, environment);
			} else if (self.data.event.climb) {
				self.on.climb(self, map);
			} else if (self.data.event.jump || input.keys.space) {
				self.on.jump(self, environment);
			}
			if (self.data.event.drag || input.keys.shift) {
				self.on.drag(self, animation);
			} else if (self.data.event.walk || input.keys.left || input.keys.right) {
				self.on.walk(self);
			}
			if (self.animations[self.data.action].speed > 0 && self.data.event.climb === false) {
				self.counter++;
			}
			var speed = self.animations[self.data.action].speed;
			if (self.data.event.drag) {
				if (self.data.blockSide === "left") {
					self.data.direction.left = true;
					self.data.direction.right = false;
				} else {
					self.data.direction.right = true;
					self.data.direction.left = false;
				}
			}
			var index = Math.floor(self.counter / speed);
			if (index > self.animations[self.data.action].frames.length - 1 || speed === 0) {
				index = 0;
				self.counter = 0;
			}
			if (self.data.isFlipped) {
				animation.context.restore();
				self.data.isFlipped = false;
			}
			var frameData = self.data.frameData = self.animations[self.data.action].frames[index];
			if (self.data.direction.left === true) {
				if (!self.data.isFlipped) {
					animation.context.save();
					animation.context.scale(-1, 1);
					animation.context.translate(-animation.canvas.width, 0);
					self.data.isFlipped = true;
				}
				animation.context.drawImage(self.image, frameData.x, frameData.y, frameData.w, frameData.h, animation.canvas.width - map.offset(self.data.x - frameData.cpx, "X") - frameData.w, map.offset(self.data.y - frameData.cpy, "Y"), frameData.w, frameData.h);
			} else {
				animation.context.drawImage(self.image, frameData.x, frameData.y, frameData.w, frameData.h, map.offset(self.data.x - frameData.cpx, "X"), map.offset(self.data.y - frameData.cpy, "Y"), frameData.w, frameData.h);
			}
			self.on.moveMap(self, environment, map);
			// self.on.resetCollisions(self, animation);
			return false;
		},
		collideBottom: function(self, x, y, collideTarget) {
			if (self.data.event.fall) {
				self.data.y = y - (self.data.h - self.data.frameData.cpy);
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
			if (!self.data.event.climb && !self.data.travel) {
				self.data.x = x - self.data.w;
			}
			self.data.action = "stand";
			self.data.event.walk = false;
			self.data.event.stand = true;
			self.data.blocked.right = true;
			if (input.keys.shift) {
				self.on.getBlockId(self, collideTarget, "right");
			}
			return false;
		},
		collideLeft: function(self, x, y, collideTarget) {
			if (!self.data.event.climb && !self.data.travel) {
				self.data.x = x;
				if (!collideTarget.data) {
					self.data.x += 32;
				}
			}
			self.data.action = "stand";
			self.data.event.walk = false;
			self.data.event.stand = true;
			self.data.blocked.left = true;
			if (input.keys.shift) {
				self.on.getBlockId(self, collideTarget, "left");
			}
			return false;
		},
		// everything to be done after the sprite has been animated.
		resetCollisions: function(self, animation) {
			self.on.parseTilePosition(self);
			self.data.action = "stand";
			self.data.onLand = false;
			self.data.blocked.left = false;
			self.data.blocked.right = false;
			self.data.direction.up = true;
			self.data.direction.down = true;
			self.data.blocked.up = false;
			self.data.blocked.down = false;
			if (!input.keys.shift) {
				self.data.blockId = 0;
			}
			if (self.data.coolDown > 0) {
				self.data.coolDown--;
			}
			if (self.data.coolDown < 0) {
				self.data.coolDown = 0;
			}
			if (self.data.openedDoor && !input.keys.up) {
				self.data.openedDoor = false;
			}
			return false;
		}
	};
});