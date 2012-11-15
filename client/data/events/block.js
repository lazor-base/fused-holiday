define(["animation", "input", "map"], function(animation, input, map) {
	return {
		animate: function(target, event) {
			var frameData = this.animations["idle"].frames[0];
				event.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, this.data.x - frameData.cpx, this.data.y - frameData.cpy, frameData.w, frameData.h);

		},
		fall:function(target, event) {
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
		},land:function(target, event) {

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
		collision: function(target, event) {
			var result = {
				triggers: []
			};
			var findNonPassable = function(data) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].passable === "false") {
						return true;
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
			var collideData = map.collide(round(sx), round(my));
			var entityCollisions = entity.collide(this);
			if (sx <= 0 || findNonPassable(collideData)) {
				result.triggers.push("left");
				this.data.action = "stand";
				this.data.event.walk = false;
				this.data.event.stand = true;
			}
			collideData = map.collide(round(ex), round(my));
			if (ex >= animation.canvas.width || findNonPassable(collideData)) {
				result.triggers.push("right");
				this.data.action = "stand";
				this.data.event.walk = false;
				this.data.event.stand = true;
			}
			collideData = map.collide(round(mx), round(sy));
			if (sy <= 0 || findNonPassable(collideData)) {
				result.triggers.push("top");
				if (this.data.event.jump) {
					this.data.event.jump = false;
					this.data.event.fall = true;
					this.data.action = "fall";
				}
			}
			collideData = map.collide(round(mx), round(ey));
			if (ey >= animation.canvas.height || findNonPassable(collideData)) {
				result.triggers.push("bottom");
				if (this.data.event.fall) {
					this.data.event.jump = false;
					this.data.event.fall = false;
					this.data.action = "land";
				}
			}
			return result;
		}
	};
});