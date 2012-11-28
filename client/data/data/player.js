/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["load"], function(load) {
	"use strict";
	load.ready();
	return {
		health: 100,
		x: 14 * 32,
		y: 10 * 32,
		tileX: 14,
		tileY: 10,
		w: 32,
		h: 64,
		id: "player",
		gameEnd:false,
		direction: {
			up: false,
			right: false,
			down: false,
			left: false
		},
		event: {
			jump: false,
			fall: true,
			walk: false,
			dash: false,
			climb: false,
			action: false,
			stop: false,
			drag: false
		},
		score:0,
		lastDirection: "right",
		action: "stand",
		onLand: false,
		blocked: {
			up: false,
			down: false,
			right: false,
			left: false
		},
		travel: false,
		targetDoor: {
			x: 0,
			y: 0,
			xSpeed: 0,
			ySpeed: 0
		},
		keys: {
			level1: false,
		},
		moving: false,
		onScreen:false,
		coolDown: 0,
		jumpRate: -3,
		jumpForce: -3,
		fallRate: 0,
		moveSpeed: 2,
		blockId:0,
		blockSide:"left",
		frameData: null,
		isFlipped: false,
		uniqueId:0,
		physics: {
			checkAgainst: ["map", "entity", "bullet"],
			types: ["player", "entity"]
		},
		oldFrame: {
			animation: "",
			index: 0
		}
	};
});