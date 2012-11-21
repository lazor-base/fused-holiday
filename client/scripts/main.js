require(["animation", "input", "entity", "map", "data/master.js","load"], function(animation, input, entity, map, master,load) {
	input.listen("keydown", function() {
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});

	function randomFromTo(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	}
	map.buildMap("test")
	entity.spawn(master.characters.player, {
		x:map.findPlayerSpawnX(),
		y:map.findPlayerSpawnY()
	}, animation.renderList);
	// entity.spawn(master.characters.block, {
	// 	x: randomFromTo(1,22)*32
	// }, animation.renderList);
	var beginRender = function() {
		animation.animationLoop.call(animation, map, master);
		return requestAnimationFrame(beginRender);
	};
	var setup = function() {
		animation.mainLoop = beginRender();
	};
	load.complete(setup);
	load.ready();
});