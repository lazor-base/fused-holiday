define(["sprite", "input", "animation"], function(sprite, input, animation) {
	return {
		player: {},
		makePlayer: function(id, animations) {
			this.player = sprite.load(id, animations, {
				health: 100,
				x: 50,
				y: 50,
				w: 42,
				h: 42,
				id: id,
				left: false,
				right: true
			});
			return this.player;
		},
		move: function() {
			if (this.player.animations[input.getType().action].speed > 0) {
				this.player.counter++;
			}
		},
		process: function() {
			var data = input.getType();
			this.setAttribute({
				"left": (data.direction === "left"),
				"right": (data.direction === "right")
			});
			if (input.left && input.right) {
				if (this.getAttribute("right") === true) {
					sprite.resetCounter(this.getAttribute("id"));
				} else if (this.getAttribute("left") === true) {
					sprite.resetCounter(this.getAttribute("id"));
				}
			} else {
				if (input.right === true) {
					this.move();
					this.setAttribute({
						"x": this.getAttribute("x") + 1
					});
					// if (this.getAttribute("x") > animation.canvas.width + sprite.getFrame(this.getAttribute("id"), input.getType()).w + 1) {
					// 	this.setAttribute({
					// 		"x": -sprite.getFrame(this.getAttribute("id"), input.getType()).w
					// 	});
					// }
				} else if (input.left === true) {
					this.move();
					this.setAttribute({
						"x": this.getAttribute("x") - 1
					});
					// if (this.getAttribute("x") < -sprite.getFrame(this.getAttribute("id"), input.getType()).w - 1) {
					// 	this.setAttribute({
					// 		"x": animation.canvas.width + sprite.getFrame(this.getAttribute("id"), input.getType()).w
					// 	});
					// }
				}
			}
			if (input.right === false && this.getAttribute("right") === true) {
				// sprite.resetCounter(this.getAttribute("id"));
			}
			if (input.left === false && this.getAttribute("left") === true) {
				// sprite.resetCounter(this.getAttribute("id"));
			}
			sprite.drawSprite(this.player.attributes.id, input.getType());
		},
		getAttribute: function(id) {
			return this.player.attributes[id];
		},
		setAttribute: function(obj) {
			for (var attr in obj) {
				this.player.attributes[attr] = obj[attr];
			}
		}
	};
});