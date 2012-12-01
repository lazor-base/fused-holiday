/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define([], function() {
	"use strict";
	return {
		keys: {
			up: false,
			down: false,
			right: false,
			left: false,
			space: false,
			z: false,
			x: false,
			shift:false,
		},
		listen: function(name, fn) {
			document.addEventListener(name, fn);
			return false;
		},
		keyDown: function(event) {
			if (event.keyCode === 39) {
				this.keys.right = true;
			}
			if (event.keyCode === 37) {
				this.keys.left = true;
			}
			if (event.keyCode === 32) {
			event.preventDefault();
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
			}if (event.keyCode === 16) {
				this.keys.shift = true;
			}
			return false;
		},
		keyUp: function(event) {
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
			if (event.keyCode === 16) {
				this.keys.shift = false;
			}
			return false;
		}
	};
});