define(["load"], function(load) {
	load.ready();
	return {
		keys: {
			up: false,
			down: false,
			right: false,
			left: false,
			space: false,
			z: false,
			x: false
		},
		listen: function(name, fn) {
			document.addEventListener(name, fn);
			return false;
		},
		trigger: function(name, details) {
			var event = new CustomEvent(name, {
				"detail": details
			});
			document.dispatchEvent(event);
			return false;
		},
		keyDown: function(event, input) {
			if (event.keyCode === 39) {
				this.keys.right = true;
			}
			if (event.keyCode === 37) {
				this.keys.left = true;
			}
			if (event.keyCode === 32) {
				this.keys.space = true;
			}
			if (event.keyCode === 38) {
				this.keys.up = true;
			}
			if (event.keyCode === 40) {
				this.keys.down = true;
			}
			if (event.keyCode === 90) {
				this.keys.z = true;
			}
			if (event.keyCode === 88) {
				this.keys.x = true;
			}
			return false;
		},
		keyUp: function(event, input) {
			if (event.keyCode === 39) {
				this.keys.right = false;
			}
			if (event.keyCode === 37) {
				this.keys.left = false;
			}
			if (event.keyCode === 32) {
				this.keys.space = false;
			}
			if (event.keyCode === 38) {
				this.keys.up = false;
			}
			if (event.keyCode === 40) {
				this.keys.down = false;
			}
			if (event.keyCode === 90) {
				this.keys.z = false;
			}
			if (event.keyCode === 88) {
				this.keys.x = false;
			}
			return false;
		}
	}
});