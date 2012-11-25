/*global require:true, requestAnimationFrame:true, define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["entity", "../data/data/world.js",
	"../data/animations/playertest.js", "../data/data/player.js", "../data/events/player.js",
	"../data/animations/block.js", "../data/data/block.js", "../data/events/block.js","load"], function(entity, world,
		playerAnimation, playerData, playerEvents,
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
	entity.make(master, null, "environment", null, world, null);
	return master;
});