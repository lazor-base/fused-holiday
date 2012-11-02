define(["animation"], function(animation) {
	var spriteSheets = {};
	var isFlipped = false;
	return {
		load: function(name, animations, attributes) {
			spriteSheets[name] = {};
			spriteSheets[name].image = new Image();
			spriteSheets[name].animations = {};
			spriteSheets[name].attributes = {};
			spriteSheets[name].counter = 0;
			for (var attr in animations) {
				spriteSheets[name].animations[attr] = animations[attr];
			}
			for (var attr in attributes) {
				spriteSheets[name].attributes[attr] = attributes[attr];
			}
			spriteSheets[name].image.src = name;
			return spriteSheets[name];
		},
		getFrame: function(name, type) {
			var speed = spriteSheets[name].animations[type.action].speed;
			var counter = spriteSheets[name].counter;
			var index = Math.floor(counter / speed);
			if (index > spriteSheets[name].animations[type.action].frames.length - 1 || speed === 0) {
				index = 0;
				this.resetCounter(name);
			}
			return spriteSheets[name].animations[type.action].frames[index];
		},
		drawSprite: function(name, type) {
			var data = this.getFrame(name, type);
			var attr = spriteSheets[name].attributes;
			if (type.direction === "left") {
				if (!isFlipped) {
					animation.context.save();
					animation.context.scale(-1, 1);
					animation.context.translate(-animation.canvas.width, 0);
					isFlipped = true;
				}
				animation.context.drawImage(spriteSheets[name].image, data.x, data.y, data.w, data.h, animation.canvas.width - (attr.x - data.cpx)-data.w, attr.y - data.cpy, data.w, data.h);
			} else {
				if (isFlipped) {
					animation.context.restore();
					isFlipped = false;
				}
				animation.context.drawImage(spriteSheets[name].image, data.x, data.y, data.w, data.h, attr.x - data.cpx, attr.y - data.cpy, data.w, data.h);
			}
		},
		resetCounter: function(name) {
			spriteSheets[name].counter = 0;
		},
		destroySprite: function(name) {
			delete spriteSheets[name];
		}
	};
});