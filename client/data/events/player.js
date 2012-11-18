define(["animation", "input", "map", "entity"], function(animation, input, map, entity) {
	return {
		walk: function(target, event) {
			if (this.data.event.stop) {
				this.data.event.stop = false;
				return true;
			}
			if (this.data.event.climb) {
				return true;
			}
			if (input.keys.left || input.keys.right) {
				this.data.event.walk = true;
				this.data.event.stand = false;
			} else {
				this.data.event.walk = false;
				this.data.event.stand = true;
			}
			if (input.keys.left && input.keys.right) {
				if (this.data.direction.right || this.data.direction.left) {
					this.counter = 0;
				}
			} else if (this.data.event.walk) {
				if (input.keys.right === true && this.data.blocked.right === false) {
					this.data.x = this.data.x + this.data.walkSpeed;
				} else if (input.keys.left === true && this.data.blocked.left === false) {
					this.data.x = this.data.x - this.data.walkSpeed;
				}

			}
			if (input.keys.right === false && this.data.direction.right === true) {
				this.counter = 0;
			}
			if (input.keys.left === false && this.data.direction.left === true) {
				this.counter = 0;
			}
		},
		door: function(target, event) {
			if (event.door) {
				var target = map.matchDoor(event.x, event.y);
				this.data.coolDown = 10;
				this.data.x = (target.x * 32) + this.data.frameData.cpx;
				this.data.y = (target.y * 32) + this.data.frameData.cpy;
			} else {
				if (this.data.direction.left) {
					this.data.x = (event.x - 1) * 32 + 15;
				} else if (this.data.direction.right) {
					this.data.x = (event.x + 1) * 32 + 16;
				}
			}
		},
		climb: function(target, event) {
			var find = function(list, type) {
				for (var i = 0; i < list.length; i++) {
					if (list[i].group === type) {
						return list[i];
					}
				}
				return false;
			};
			var climbUp = function() {
				this.data.fallRate = 0;
				this.data.jumpRate = this.data.jumpForce;
				this.data.action = "climb";
				this.data.event.jump = false;
				this.data.event.fall = false;
				this.data.y = this.data.y - 1;
				this.data.onLand = false;
				this.counter++;
				this.data.event.climb = true;
			};
			var climDown = function() {
				this.data.fallRate = 0;
				this.data.jumpRate = this.data.jumpForce;
				this.data.action = "climb";
				this.data.event.jump = false;
				this.data.event.fall = false;
				this.data.y = this.data.y + 1;
				this.data.onLand = false;
				this.counter++;
				this.data.event.climb = true;
			};
			var fall = function() {
				if (!this.data.onLand && this.data.event.climb) {
					this.data.event.climb = false;
					this.data.event.fall = true;
				}
			};
			var collideData, data;
			var x = this.data.tileX;
			var y = this.data.tileY;
			var current = map.events(x, y);
			var above = map.events(x, y - 1);
			var below = map.events(x, y + 1);
			if (input.keys.up === true) {
				if ((this.data.event.jump || this.data.event.fall) && !this.data.event.climb) {
					climbUp.call(this);
				} else if (find(current, "wall") && find(current, "ladder") && !find(above, "ladder")) {
					climbUp.call(this);
				} else if (find(current, "ladder") && find(above, "ladder")) {
					climbUp.call(this);
				} else if (!find(current, "ladder") && find(below, "ladder") && this.data.event.climb) {
					climbUp.call(this);
				} else if (!find(current, "ladder") && !find(above, "ladder")) {
					fall.call(this);
				} else {
					fall.call(this);
				}
			} else if (input.keys.down === true) {
				if (find(current, "wall") && find(current, "ladder") && find(below, "ladder")) {
					climDown.call(this);
				} else if (!find(current, "ladder") && find(below, "ladder")) {
					climDown.call(this);
				} else if (find(current, "ladder") && find(below, "ladder")) {
					climDown.call(this);
				} else if (find(current, "ladder") && !find(below, "ladder")) {
					fall.call(this);
				} else {
					fall.call(this);
				}
			}
		},
		parseTilePosition: function() {
			var round = function(number) {
				var num = Math.round(number / 32);
				return num;
			};
			var speed = this.animations[this.data.action].speed;
			var counter = this.counter;
			var index = Math.floor(counter / speed);
			if (index > this.animations[this.data.action].frames.length - 1 || speed === 0) {
				index = 0;
				this.counter = 0;
			}
			this.data.frameData = this.animations[this.data.action].frames[index];
			this.data.tileX = round(this.data.x - this.data.frameData.cpx);
			this.data.tileY = round(this.data.y - this.data.frameData.cpy);
		},
		action: function(target, event) {
			if(this.data.coolDown) {
				return false;
			}
			var find = function(list, type) {
				if (list) {
					for (var i = 0; i < list.length; i++) {
						if (!list[i]) {}
						if (list[i].event.indexOf(type) > -1) {
							return list[i];
						}
					}
				}
				return false;
			};
			var collideData, data, current, below;
			var x = this.data.tileX;
			var y = this.data.tileY;
			current = map.events(x, y);
			below = map.events(x, y + 1);
			if (find(current, "door")) {
				this.on.door.call(this, target, {
					x: x,
					y: y,
					door: find(current, "door")
				});
			} else {
				if (find(current, "ladder") || find(below, "ladder")) {
					this.on.climb.call(this, target, event);
				} else {
					if (this.data.direction.left) {
						x = x - 1;
						collideData = map.events(x, y);
						data = find(collideData, "door");
						if (data) {
							this.on.door.call(this, target, {
								x: x,
								y: y
							});
						}
					} else {
						x = x + 1;
						collideData = map.events(x, y);
						data = find(collideData, "door");
						if (data) {
							this.on.door.call(this, target, {
								x: x,
								y: y
							});
						}
					}
				}
			}
			return event;
		},
		jump: function(target, event) {
			if (!input.keys.space || this.data.jumpRate >= 0 || this.data.event.climb) {
				this.data.event.jump = false;
				this.data.event.fall = true;
			} else {
				if (this.data.event.jump === false) {}
				this.data.onLand = false;
				this.data.action = "jump";
				this.data.event.jump = true;
				this.data.y += Math.floor(2 * this.data.jumpRate);
				this.data.jumpRate += target.world.data.gravity;
			}
		},
		fall: function(target, event) {
			this.data.action = "fall";
			this.data.event.fall = true;
			this.data.event.climb = false;
			this.data.event.jump = false;
			this.data.y += Math.floor(2 * this.data.fallRate);
			this.data.fallRate += target.world.data.gravity;

		},
		land: function(target, event) {
			this.data.action = "land";
			this.data.onLand = true;
			this.data.event.jump = false;
			this.data.event.fall = false;
			this.data.event.climb = false;
			this.data.fallRate = 0;
			this.data.jumpRate = this.data.jumpForce;
		},
		animate: function(target, event) {
			if (input.keys.left && input.keys.right) {
				//both keys pressed, dont change anything.
			} else if (input.keys.left || input.keys.right) {
				if (input.keys.left) {
					this.data.lastDirection = "left";
				}
				if (input.keys.right) {
					this.data.lastDirection = "right";
				}
				this.data.action = "walk";
			}
			this.data.direction.left = this.data.lastDirection === "left";
			this.data.direction.right = this.data.lastDirection === "right";
			if ((this.data.event.action || input.keys.up || input.keys.down) && this.data.event.climb === false) {
				this.on.action.call(this, target, event);
			}
			if (this.data.event.fall || (!this.data.onLand && !this.data.event.climb && !this.data.event.jump)) {
				this.on.fall.call(this, target, event);
			} else if (this.data.event.jump || input.keys.space) {
				this.on.jump.call(this, target, event);
			} else if (this.data.event.climb) {
				this.on.climb.call(this, target, event);
			}
			if (this.data.event.walk || input.keys.left || input.keys.right) {
				this.on.walk.call(this, target, event);
			}
			if (this.animations[this.data.action].speed > 0 && this.data.event.climb === false) {
				this.counter++;
			}
			var speed = this.animations[this.data.action].speed;
			var index = Math.floor(this.counter / speed);
			if (index > this.animations[this.data.action].frames.length - 1 || speed === 0) {
				index = 0;
				this.counter = 0;
			}
			var frameData = this.data.frameData = this.animations[this.data.action].frames[index];
			if (this.data.direction.left === true) {
				if (!this.data.isFlipped) {
					animation.context.save();
					animation.context.scale(-1, 1);
					animation.context.translate(-animation.canvas.width, 0);
					this.data.isFlipped = true;
				}
				animation.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, animation.canvas.width - (this.data.x - frameData.cpx) - frameData.w, this.data.y - frameData.cpy, frameData.w, frameData.h);
			} else {
				animation.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, this.data.x - frameData.cpx, this.data.y - frameData.cpy, frameData.w, frameData.h);
			}
			this.on.resetCollisions.call(this);
		},
		collideBottom: function(target) {
			if (this.data.event.fall) {
				this.data.y = (target.y * 32) - 13;
				this.on.land.call(this);
			}
			this.data.onLand = true;
			this.data.blocked.down = true;
		},
		collideTop: function(target) {
			if (this.data.event.jump) {
				// this.data.y = (target.y * 32) +32+20;
				this.data.event.jump = false;
				this.data.event.fall = true;
				this.data.action = "fall";
			}
			this.data.blocked.up = true;
		},
		collideRight: function(target) {
			this.data.action = "stand";
			this.data.event.walk = false;
			this.data.event.stand = true;
			this.data.blocked.right = true;
		},
		collideLeft: function(target) {
			this.data.action = "stand";
			this.data.event.walk = false;
			this.data.event.stand = true;
			this.data.blocked.left = true;
		},
		// everything to be done after the sprite has been animated.
		resetCollisions: function() {
			this.data.action = "stand";
			this.data.onLand = false;
			this.data.blocked.left = false;
			this.data.blocked.right = false;
			this.data.blocked.up = false;
			this.data.blocked.down = false;
			if (this.data.isFlipped) {
				animation.context.restore();
				this.data.isFlipped = false;
			}
			if (this.data.coolDown > 0) {
				this.data.coolDown--;
			}
			if (this.data.coolDown < 0) {
				this.data.coolDown = 0;
			}
			this.on.parseTilePosition.call(this);
		}
	};
});