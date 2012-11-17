define(["animation", "input", "map"], function(animation, input, map) {
	return {
		walk: function(target, event) {
			var collide = this.on.collision.call(this, target, event);
			if (collide.triggers.indexOf("left") > -1 || collide.triggers.indexOf("right") > -1) {
				event = collide.event;
			}
			if (input.keys.left || input.keys.right) {
/*this.data.event.walk = true;
				this.data.event.stand = false;*/
			} else {
				this.data.event.walk = false;
				this.data.event.stand = true;
			}
			if (input.keys.left && input.keys.right) {
/*if (this.data.direction.right || this.data.direction.left) {
					this.counter = 0;
				}*/
			} else if (this.data.event.walk && (collide.triggers.indexOf("left") === -1 && collide.triggers.indexOf("right") === -1)) {
/*if (input.keys.right === true) {
					this.data.x = this.data.x + 1;
				} else if (input.keys.left === true) {
					this.data.x = this.data.x - 1;
				}*/
			}
			if (input.keys.right === false && this.data.direction.right === true) {
				// this.counter = 0;
			}
			if (input.keys.left === false && this.data.direction.left === true) {
				// this.counter = 0;
			}
			return event;
		},
		dash: function(target, event) {
			return event;
		},
		stand: function(target, event) {
			return event;
		},
		jump: function(target, event) {
			event = this.on.walk.call(this, target, event);
			var collide = this.on.collision.call(this, target, event);
			if (collide.triggers.indexOf("top") > -1 || this.data.jumpRate >= 0) {
				this.data.event.jump = false;
				event = collide.event;
				this.on.fall.call(this, target, event);
			} else {
				this.data.fallRate = 0;
				event.action = "jump";
				this.data.event.jump = true;
				this.data.y += Math.floor(2 * this.data.jumpRate);
				this.data.jumpRate += target.world.data.gravity;
				if (!input.keys.space) {
/*this.data.event.jump = false;
					this.data.event.fall = true;*/
				}
			}
			return event;
		},
		fall: function(target, event) {
			event = this.on.walk.call(this, target, event);
			var collide = this.on.collision.call(this, target, event);
			if (collide.triggers.indexOf("bottom") > -1) {
				this.data.event.fall = false;
				event = collide.event;
				this.on.land.call(this, target, event);
			} else {
				this.data.jumpRate = this.data.jumpForce;
				event.action = "fall";
				this.data.event.fall = true;
				this.data.y += Math.floor(2 * this.data.fallRate);
				this.data.fallRate += target.world.data.gravity;
			}
			return event;
		},
		land: function(target, event) {
			this.data.event.jump = false;
			this.data.event.fall = false;
			this.data.fallRate = 0;
			this.data.jumpRate = this.data.jumpForce;
			return event;
		},
		crouch: function(target, event) {

		},
		destroy: function(target, event) {
			var oldFrame = null;
			if (this.data.oldFrame.animation !== "") {
				oldFrame = this.animations[this.data.oldFrame.animation].frames[this.data.oldFrame.index];
			}
			if (this.data.direction.left === true) {
				if (!this.data.isFlipped) {
					event.context.save();
					event.context.scale(-1, 1);
					event.context.translate(-animation.canvas.width, 0);
					this.data.isFlipped = true;
				}
				if (oldFrame !== null) {
					event.context.clearRect(animation.canvas.width - (this.data.oldFrame.x - oldFrame.cpx) - oldFrame.w-3, this.data.oldFrame.y - oldFrame.cpy-3, oldFrame.w+3, oldFrame.h+3)
				}
			} else {
				if (this.data.isFlipped) {
					event.context.restore();
					this.data.isFlipped = false;
				}
				if (oldFrame !== null) {
					event.context.clearRect(this.data.oldFrame.x - oldFrame.cpx-3, this.data.oldFrame.y - oldFrame.cpy-3, oldFrame.w+3, oldFrame.h+3)
				}
			}
		},
		animate: function(target, event) {
			var motionType = {
				action: "stand",
				move: false
			};
/*this.data.direction.left = input.lastDirection === "left";
			this.data.direction.right = input.lastDirection === "right";*/
			if (this.data.event.fall) {
				motionType = this.on.fall.call(this, target, motionType);
			} else if (this.data.event.jump /* || input.keys.space*/ ) {
				motionType = this.on.jump.call(this, target, motionType);
			} else if (this.data.event.walk /* || input.keys.left || input.keys.right*/ ) {
				motionType = this.on.walk.call(this, target, motionType);
			}
			if (this.animations[motionType.action].speed > 0) {
				this.counter++;
			}
			var speed = this.animations[motionType.action].speed;
			var counter = this.counter;
			var index = Math.floor(counter / speed);
			if (index > this.animations[motionType.action].frames.length - 1 || speed === 0) {
				index = 0;
				this.counter = 0;
			}
			var oldFrame = null;
			if (this.data.oldFrame.animation !== "") {
				oldFrame = this.animations[this.data.oldFrame.animation].frames[this.data.oldFrame.index];
			}
			var frameData = this.data.frameData = this.animations[motionType.action].frames[index];
			if (this.data.direction.left === true) {
				if (!this.data.isFlipped) {
					event.context.save();
					event.context.scale(-1, 1);
					event.context.translate(-animation.canvas.width, 0);
					this.data.isFlipped = true;
				}
				event.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, animation.canvas.width - (this.data.x - frameData.cpx) - frameData.w, this.data.y - frameData.cpy, frameData.w, frameData.h);
			} else {
				event.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, this.data.x - frameData.cpx, this.data.y - frameData.cpy, frameData.w, frameData.h);
			}
			if (this.data.isFlipped) {
				event.context.restore();
				this.data.isFlipped = false;
			}
			this.data.oldFrame.index = index;
			this.data.oldFrame.animation = motionType.action;
			this.data.oldFrame.x = this.data.x;
			this.data.oldFrame.y = this.data.y;
		},

		collision: function(target, event) {
			var result = {
				triggers: [],
				event: event
			};
			var round = function(number) {
				var num = Math.round(number / 32) - 1;
				if (num < 0) {
					num = 0;
				}
				return num;
			};
			var sx = this.data.x /* - !! (input.keys.left)*/
			;
			var sy = this.data.y;
			var ex = this.data.x + this.data.w /* + !! (input.keys.right)*/
			;
			var ey = this.data.y + this.data.h;
			var mx = (sx + ex) / 2;
			var my = (sy + ey) / 2;
			var collideData = map.collide(round(sx), round(my));
			if (sx <= 0 || collideData.passable === false) {
				result.triggers.push("left");
				result.event.action = "stand";
				this.data.event.walk = false;
				this.data.event.stand = true;
			}
			collideData = map.collide(round(ex), round(my));
			if (ex >= animation.canvas.width || collideData.passable === false) {
				result.triggers.push("right");
				result.event.action = "stand";
				this.data.event.walk = false;
				this.data.event.stand = true;
			}
			collideData = map.collide(round(mx), round(sy));
			if (sy <= 0 || collideData.passable === false) {
				result.triggers.push("top");
				if (this.data.event.jump) {
					this.data.event.jump = false;
					this.data.event.fall = true;
					result.event.action = "fall";
				}
			}
			collideData = map.collide(round(mx), round(ey));
			if (ey >= animation.canvas.height || collideData.passable === false) {
				result.triggers.push("bottom");
				if (this.data.event.fall) {
					this.data.event.jump = false;
					this.data.event.fall = false;
					result.event.action = "land";
				}
			}
			return result;
		}
	};
});