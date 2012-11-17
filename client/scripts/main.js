require(["animation", "input", "entity", "map", "/data/master.js"], function(animation, input, entity, map, master) {

	input.listen("keydown", function() {
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});
	map.buildMap("test")
	entity.spawn(master.characters.player, {}, animation.renderList);
	entity.spawn(master.characters.block, {}, animation.renderList);
	var beginRender = function() {
		animation.animationLoop.call(animation, map, master);
		return requestAnimationFrame(beginRender);
	};
	animation.mainLoop = beginRender();
});