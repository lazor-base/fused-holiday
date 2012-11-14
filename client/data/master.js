define(["entity", "/client/data/animations/mmz.js", "/client/data/data/mmz.js", "/client/data/events/mmz.js", "/client/data/data/world.js","/client/data/animations/dummy.js", "/client/data/data/dummy.js", "/client/data/events/dummy.js"], function(entity, mmzanimation, mmzdata, mmzevents, world,dummyanimation, dummydata, dummyevents) {
	var master = {
		characters: {},
		tiles: {},
		objects: {},
		tools: {},
		environment: {}
	};
	entity.make(master, "/client/images/mmz.png", "characters", mmzanimation, mmzdata, mmzevents);
	entity.make(master, "/client/images/mmz.png", "characters", dummyanimation, dummydata, dummyevents);
	entity.make(master, null, "environment", null, world, null);
	return master;
});