define(["animation", "input", "map","load"], function(animation, input, map,load) {
	load.ready();
	return {
		animate: function(target, event) {
			if (this.data.event.fall || !this.data.onLand) {
				this.on.fall.call(this, target, event);
			}
			if (this.data.event.move) {
				this.on.move.call(this, target, event);
			}
			animation.context.drawImage(this.image, this.data.frameData.x, this.data.frameData.y, this.data.frameData.w, this.data.frameData.h, this.data.x - this.data.frameData.cpx, this.data.y - this.data.frameData.cpy, this.data.w, this.data.h);
			this.on.resetCollisions.call(this);
		},
		// fall: function(target, event) {
		// 	var collide = this.on.collision.call(this, target, event);
		// 	this.data.jumpRate = this.data.jumpForce;
		// 	if (collide.triggers.indexOf("bottom") > -1) {
		// 		this.data.event.fall = false;
		// 		this.on.land.call(this, target, event);
		// 	} else {
		// 		this.data.action = "fall";
		// 		this.data.event.fall = true;
		// 		this.data.y += Math.floor(2 * this.data.fallRate);
		// 		this.data.fallRate += target.world.data.gravity;
		// 	}
		// 	this.on.parseTilePosition.call(this, target, event);
		// },
		move: function(target, event) {
			if (this.data.direction.right === true && this.data.blocked.right === false) {
				this.data.x = this.data.x + this.data.moveSpeed;
			} else if (this.data.direction.left === true && this.data.blocked.left === false) {
				this.data.x = this.data.x - this.data.moveSpeed;
			}
		},
		fall: function(target, event) {
			this.data.event.fall = true;
			this.data.y += Math.floor(2 * this.data.fallRate);
			this.data.fallRate += target.world.data.gravity;

		},
		land: function(target, event) {
			this.data.onLand = true;
			this.data.event.fall = false;
			this.data.fallRate = 0;
		},
		collideBottom: function(target) {
			if (this.data.event.fall) {
				this.data.y = (target.y * 32) - 32;
				this.on.land.call(this);
			}
			this.data.onLand = true;
			this.data.blocked.down = true;
		},
		collideTop: function(target) {
			this.data.blocked.up = true;
		},
		collideRight: function(target) {
			this.data.event.move = true;
			this.data.direction.left = true;
			this.data.blocked.right = true;
		},
		collideLeft: function(target) {
			this.data.event.move = true;
			this.data.direction.right = true;
			this.data.blocked.left = true;
		},
		parseTilePosition: function() {
			var round = function(number) {
				var num = Math.round(number / 32);
				return num;
			};
			// console.log(this.data)
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
		// everything to be done after the sprite has been animated.
		resetCollisions: function() {
			this.data.action = "idle";
			this.data.onLand = false;
			this.data.direction.left = false;
			this.data.direction.right = false;
			this.data.blocked.left = false;
			this.data.blocked.right = false;
			this.data.blocked.up = false;
			this.data.blocked.down = false;
			if (this.data.isFlipped) {
				animation.context.restore();
				this.data.isFlipped = false;
			}
			this.on.parseTilePosition.call(this);
		}
	};
});