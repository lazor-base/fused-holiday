require(["entity", "/client/data/animations/mmz.js", "/client/data/data/mmz.js", "/client/data/events/mmz.js", "/client/data/data/world.js"], function(entity, mmzanimation, data, events, world) {
// to prevent caching of values
	console.log(arguments)
	entity.make("/client/images/mmz.png", "characters", mmzanimation, data, events);
	entity.make(null, "environment", null, world, null);
	document.getElementById("output").innerText = entity.print("AMD");
});