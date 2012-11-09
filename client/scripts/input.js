define(["player"], function(entity) {
	return {
		left: false,
		right: false,
		jump: false,
		// cache is necessary for knowing what direction the player is facing when no keys are pressed.
		cache: "right",
		/**
		 * rework function to simplify and be more generic
		 * @return {[type]} [description]
		 */
		getType: function() {
			var action = "stand";
			var direction = {
				left: (this.cache === "left"),
				right: (this.cache === "right")
			};
			if (this.left) {
				direction = {
					left: true,
					right: false
				};
				this.cache = "left";
				action = "walk";
			}
			if (this.right) {
				direction = {
					left: false,
					right: true
				};
				this.cache = "right";
				action = "walk";
			}
			if (this.jump) {
				action = "jump";
			}
			return {
				action: action,
				direction: direction
			};
		},
		listen: function(name, fn) {
			document.addEventListener(name, fn);
		},
		trigger: function(name, details) {
			var event = new CustomEvent(name, {
				"detail": details
			});
			document.dispatchEvent(event);
		},
		keyDown: function(event, input) {
			if (event.keyCode === 39) {
				this.right = true;
			} else if (event.keyCode === 37) {
				this.left = true;
			} else if (event.keyCode === 32) {
				this.jump = true;
			}
		},
		keyUp: function(event, input) {
			if (event.keyCode === 39) {
				this.right = false;
			} else if (event.keyCode === 37) {
				this.left = false;
			} else if (event.keyCode === 32) {
				this.jump = false;
			}
		}
	}
});