define(["player"], function(entity) {
	return {
		keys: {
			up: false,
			down: false,
			right: false,
			left: false,
			space: false
		},
		// lastDirection is necessary for knowing what direction the player is facing when no keys are pressed.
		lastDirection: "right",
		/**
		 * rework function to simplify and be more generic
		 * @return {[type]} [description]
		 */
		getType: function() {
			var action = "stand";
			var move = false;
			if (this.keys.left && this.keys.right) {
				//both keys pressed, dont change anything.
			} else if(this.keys.left || this.keys.right) {
				if (this.keys.left) {
					this.lastDirection = "left";
				}
				if (this.keys.right) {
					this.lastDirection = "right";
				}
				move = true;
				action = "walk";
			}
			if (this.keys.space) {
				action = "jump";
			}
			return {
				action: action,
				keys: this.keys,
				move:move
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
				this.keys.right = true;
			} else if (event.keyCode === 37) {
				this.keys.left = true;
			} else if (event.keyCode === 32) {
				this.keys.space = true;
			} else if (event.keyCode === 90) {
				this.keys.z = true;
			} else if (event.keyCode === 88) {
				this.keys.x = true;
			}
		},
		keyUp: function(event, input) {
			if (event.keyCode === 39) {
				this.keys.right = false;
			} else if (event.keyCode === 37) {
				this.keys.left = false;
			} else if (event.keyCode === 32) {
				this.keys.space = false;
			} else if (event.keyCode === 90) {
				this.keys.z = false;
			} else if (event.keyCode === 88) {
				this.keys.x = false;
			}
		}
	}
});