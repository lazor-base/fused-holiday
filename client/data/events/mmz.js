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
			var collide = this.on.collision.call(this, target, event);
			if (collide.triggers.indexOf("left") > -1 || collide.triggers.indexOf("right") > -1) {
				return false;
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
			} else if (this.data.event.walk && (collide.triggers.indexOf("left") === -1 && collide.triggers.indexOf("right") === -1)) {
				if (input.keys.right === true) {
					this.data.x = this.data.x + 1;
				} else if (input.keys.left === true) {
					this.data.x = this.data.x - 1;
				}

			}
			if (input.keys.right === false && this.data.direction.right === true) {
				this.counter = 0;
			}
			if (input.keys.left === false && this.data.direction.left === true) {
				this.counter = 0;
			}
			this.on.parseTilePosition.call(this, target, event);
		},
		dash: function(target, event) {},
		stand: function(target, event) {},
		door: function(target, event) {
			if (this.data.direction.left) {
				this.data.x = (event.x - 1) * 32 + 15;
			} else if (this.data.direction.right) {
				this.data.x = (event.x + 1) * 32 + 16;
			}
			this.on.parseTilePosition.call(this, target, event);
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
				this.data.action = "climb";
				this.data.event.jump = false;
				this.data.event.fall = false;
				this.data.fallRate = 0;
				this.data.jumpRate = this.data.jumpForce;
				this.data.y = this.data.y - 1;
				this.onLand = false;
				this.counter++;
				this.data.event.climb = true;
			};
			var climDown = function() {
				this.data.action = "climb";
				this.data.y = this.data.y + 1;
				this.onLand = false;
				this.counter++;
				this.data.event.climb = true;
			};
			var fall = function() {
				if (!this.onLand) {
					this.data.event.fall = true;
				}
			};
			this.on.parseTilePosition.call(this, target, event);
			var collideData, data;
			var x = this.data.tileX;
			var y = this.data.tileY;
			var current = map.collide(x, y);
			var above = map.collide(x, y - 1);
			var below = map.collide(x, y + 1);
			if (input.keys.up === true) {
				if ((this.data.event.jump || this.data.event.fall) && !this.data.climb) {
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
			this.on.parseTilePosition.call(this, target, event);
		},
		parseTilePosition: function(target, event) {
			var round = function(number) {
				var num = Math.round(number / 32) - 1;
				if (num < 0) {
					num = 0;
				}
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
			this.data.tileX = round(this.data.x - this.data.frameData.cpx) + 1;
			this.data.tileY = round(this.data.y - this.data.frameData.cpy) + 1;
		},
		action: function(target, event) {
			var find = function(list, type) {
				for (var i = 0; i < list.length; i++) {
					if (list[i].group === type) {
						return list[i];
					}
				}
			};
			var collideData, data, current, below;
			var x = this.data.tileX;
			var y = this.data.tileY;
			current = map.collide(x, y);
			below = map.collide(x, y + 1);
			if (find(current, "door")) {
				this.on.door.call(this, target, {
					x: x,
					y: y
				});
			} else {
				if (find(current, "ladder") || find(below, "ladder")) {
					this.on.climb.call(this, target, event);
				} else {
					if (this.data.direction.left) {
						x = x - 1;
						collideData = map.collide(x, y);
						data = find(collideData, "door");
						if (data) {
							this.on.door.call(this, target, {
								x: x,
								y: y
							});
						}
					} else {
						x = x + 1;
						collideData = map.collide(x, y);
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
			// event = this.on.walk.call(this, target, event);
			var collide = this.on.collision.call(this, target, event);
			this.data.fallRate = 0;
			if (collide.triggers.indexOf("top") > -1 || this.data.jumpRate >= 0 || this.data.event.climb) {
				this.data.event.climb = false;
				this.data.event.jump = false;
				this.on.fall.call(this, target, event);
			} else {
				this.onLand = false;
				this.data.action = "jump";
				this.data.event.jump = true;
				this.data.y += Math.floor(2 * this.data.jumpRate);
				this.data.jumpRate += target.world.data.gravity;

				if (!input.keys.space) {
					this.data.event.jump = false;
					this.data.event.fall = true;
				}
			}
			this.on.parseTilePosition.call(this, target, event);
		},
		fall: function(target, event) {
			// event = this.on.walk.call(this, target, event);
			var collide = this.on.collision.call(this, target, event);
			this.data.jumpRate = this.data.jumpForce;
			if (collide.triggers.indexOf("bottom") > -1) {
				this.data.event.fall = false;
				this.on.land.call(this, target, event);
			} else {
				this.data.action = "fall";
				this.data.event.fall = true;
				this.data.y += Math.floor(2 * this.data.fallRate);
				this.data.fallRate += target.world.data.gravity;
			}
			this.on.parseTilePosition.call(this, target, event);
		},
		land: function(target, event) {
			this.onLand = true;
			this.data.event.jump = false;
			this.data.event.fall = false;
			this.data.event.climb = false;
			this.data.fallRate = 0;
			this.data.jumpRate = this.data.jumpForce;
		},
		crouch: function(target, event) {

		},
		animate: function(target, event) {
			this.data.action = "stand";
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
			if (this.data.event.fall) {
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
			var counter = this.counter;
			var index = Math.floor(counter / speed);
			if (index > this.animations[this.data.action].frames.length - 1 || speed === 0) {
				index = 0;
				this.counter = 0;
			}
			var oldFrame = null;
			if (this.data.oldFrame.animation !== "") {
				oldFrame = this.animations[this.data.oldFrame.animation].frames[this.data.oldFrame.index];
			}
			var frameData = this.animations[this.data.action].frames[index];
			if (this.data.direction.left === true) {
				if (!this.data.isFlipped) {
					event.context.save();
					event.context.scale(-1, 1);
					event.context.translate(-animation.canvas.width, 0);
					this.data.isFlipped = true;
				}
				event.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, animation.canvas.width - (this.data.x - frameData.cpx) - frameData.w, this.data.y - frameData.cpy, frameData.w, frameData.h);
			} else {
				if (this.data.isFlipped) {
					event.context.restore();
					this.data.isFlipped = false;
				}
				event.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, this.data.x - frameData.cpx, this.data.y - frameData.cpy, frameData.w, frameData.h);
			}
			if (this.data.isFlipped) {
				event.context.restore();
				this.data.isFlipped = false;
			}
			this.data.oldFrame.index = index;
			this.data.oldFrame.animation = this.data.action;
			this.data.oldFrame.x = this.data.x;
			this.data.oldFrame.y = this.data.y;
		},
		stop: function(target, event) {
			this.data.event.stop = true;
		},
		collision: function(target, event) {
			var result = {
				triggers: []
			};
			var findNonPassableTile = function(data) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].passable === "false") {
						return true;
					}
				}
				return false;
			};
			var findNonPassableEntity = function(data) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].target.data.passable === false) {
						return data[i];
					}
				}
				return false;
			};
			var round = function(number) {
				var num = Math.round(number / 32) - 1;
				if (num < 0) {
					num = 0;
				}
				return num;
			};
			var sx = this.data.x - !! (input.keys.left);
			var sy = this.data.y;
			var ex = this.data.x + this.data.w + !! (input.keys.right);
			var ey = this.data.y + this.data.h;
			var mx = (sx + ex) / 2;
			var my = (sy + ey) / 2;
			var entityCollisions = entity.collide(this);
			var collideData = map.collide(round(sx), round(my));
			entityCollisionData = findNonPassableEntity(entityCollisions);
			if (sx <= 0 || findNonPassableTile(collideData) || (entityCollisionData && entityCollisionData.direction === "left")) {
				result.triggers.push("left");
				this.data.action = "stand";
				this.data.event.walk = false;
				this.data.event.stand = true;
			}
			collideData = map.collide(round(ex), round(my));
			if (ex >= animation.canvas.width || findNonPassableTile(collideData) || (entityCollisionData && entityCollisionData.direction === "right")) {
				result.triggers.push("right");
				this.data.action = "stand";
				this.data.event.walk = false;
				this.data.event.stand = true;
			}
			collideData = map.collide(round(mx), round(sy));
			if (sy <= 0 || findNonPassableTile(collideData) || (entityCollisionData && entityCollisionData.direction === "top")) {
				result.triggers.push("top");
				if (this.data.event.jump) {
					this.data.event.jump = false;
					this.data.event.fall = true;
					this.data.action = "fall";
				}
			}
			collideData = map.collide(round(mx), round(ey));
			if (ey >= animation.canvas.height || findNonPassableTile(collideData) || (entityCollisionData && entityCollisionData.direction === "bottom")) {
				result.triggers.push("bottom");
				if (this.data.event.fall) {
					this.data.action = "land";
				}
			} else {
				console.log(entity.collide(this))
				if (this.data.event.jump === false) {
					this.data.event.fall = true;
				}
			}
			return result;
		}
	};
});