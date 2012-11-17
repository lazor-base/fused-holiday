define(["physics", "map"], function(physics, map) {
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

		if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}());
	return {
		canvas: {},
		context: {},
		renderList: [],
		mainLoop: null,
		startLoop: function(fn) {
			return fn();
		},
		stopLoop: function(id) {
			cancelAnimationFrame(id);
		},
		setup: function(id) {
			this.canvas = document.getElementById(id);
			this.context = this.canvas.getContext('2d');
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},
		animationLoop: function(map, master) {
			var length = this.renderList.length;
			var thisEntity;
			map.animate(this);
			this.setup("objects");
			for (var i = 0; i < length; i++) {
				var thisEntity = this.renderList[i];
				if (thisEntity.remove) {
					thisEntity.on.destroy.call(thisEntity, null, null);
					this.renderList.splice(i);
					length = this.renderList.length;
					i--;
				} else {
					physics(thisEntity, this.renderList);
					if (thisEntity.data.id === "player") {
						this.setup("player");
						thisEntity.on.animate.call(thisEntity, master.environment, null);
						this.context.fillStyle = "rgba(0,0,0,0.5)";
						this.context.fillRect(thisEntity.data.x - thisEntity.data.frameData.cpx, thisEntity.data.y - thisEntity.data.frameData.cpy, thisEntity.data.w, thisEntity.data.h)
						// this.context.fillStyle = "red";
						// this.context.fillRect(thisEntity.data.tileX*32,thisEntity.data.tileY*32,thisEntity.data.w,thisEntity.data.h)
						this.setup("objects");
					} else {
						thisEntity.on.animate.call(thisEntity, master.environment, null);
						this.context.fillStyle = "rgba(0,0,0,0.5)";
						this.context.fillRect(thisEntity.data.x - thisEntity.data.frameData.cpx, thisEntity.data.y - thisEntity.data.frameData.cpy, thisEntity.data.w, thisEntity.data.h)
						// this.context.fillStyle = "red";
						// this.context.fillRect(thisEntity.data.tileX*32,thisEntity.data.tileY*32,thisEntity.data.w,thisEntity.data.h)
					}
				}
			}
		}
	};
});