define(["entity", "/client/data/data/world.js",
	"/client/data/animations/playertest.js", "/client/data/data/player.js", "/client/data/events/player.js",
	"/client/data/animations/dummy.js", "/client/data/data/dummy.js", "/client/data/events/dummy.js",
	"/client/data/animations/block.js", "/client/data/data/block.js", "/client/data/events/block.js"], function(entity, world,
		playerAnimation, playerData, playerEvents,
		dummyanimation, dummydata, dummyevents,
		blockAnimation, blockData, blockEvents) {
	var master = {
		characters: {},
		tiles: {},
		objects: {},
		tools: {},
		environment: {}
	};
	entity.make(master, "/client/images/tiles.png", "characters", blockAnimation, blockData, blockEvents);
	entity.make(master, "/client/images/playertest.png", "characters", playerAnimation, playerData, playerEvents);
	entity.make(master, "/client/images/mmz.png", "characters", dummyanimation, dummydata, dummyevents);
	entity.make(master, null, "environment", null, world, null);
	return master;
});