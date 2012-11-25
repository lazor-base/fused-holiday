/*global require:true, requestAnimationFrame:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
require(["animation", "input", "entity", "map", "../data/master.js", "load"], function(animation, input, entity, map, master, load) {
	"use strict";
	input.listen("keydown", function() {
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});

	var randomFromTo = function(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	};
	map.buildMap("test");
	entity.spawn(master.characters.player, {
		x: map.findPlayerSpawnX(),
		y: map.findPlayerSpawnY()
	}, animation.renderList);
	// entity.spawn(master.characters.block, {
	// 	x: randomFromTo(1, 22) * 32
	// }, animation.renderList);
	entity.spawn(master.characters.block, {
		x: 3*32
	}, animation.renderList);
	var beginRender = function() {
		animation.animationLoop(animation, map, master);
		return requestAnimationFrame(beginRender);
	};
	var setup = function() {
		animation.mainLoop = beginRender();
	};
	load.complete(setup);
	load.ready();
});