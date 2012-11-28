/*global require:true, requestAnimationFrame:true, define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["entity", "../data/data/world.js",
	"../data/animations/playertest.js", "../data/data/player.js", "../data/events/player.js",
	"../data/animations/level1Key.js", "../data/data/level1Key.js", "../data/events/level1Key.js",
	"../data/animations/block.js", "../data/data/block.js", "../data/events/block.js","load"], function(entity, world,
		playerAnimation, playerData, playerEvents,
		level1KeyAnimations, level1KeyData, level1KeyEvents,
		blockAnimation, blockData, blockEvents,load) {
		load.ready();
	var master = {
		characters: {},
		tiles: {},
		objects: {},
		tools: {},
		environment: {}
	};
	entity.make(master, "../images/tiles.png", "characters", blockAnimation, blockData, blockEvents);
	entity.make(master, "../images/playertest.png", "characters", playerAnimation, playerData, playerEvents);
	entity.make(master, "../images/level1Key.png", "objects", level1KeyAnimations, level1KeyData, level1KeyEvents);
	entity.make(master, null, "environment", null, world, null);
	return master;
});