require(["animation", "player", "input", "entity", "map", "/client/data/maps.js", "/client/data/master.js"], function(animation, player, input, entity, map, maps, master) {

	input.listen("keydown", function() {
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});
	map.buildMap("test")
	// player.setPlayer(master.characters.player);
	entity.spawn(master.characters.player, {}, animation.renderList);
	entity.spawn(master.characters.block, {}, animation.renderList);
	var beginRender = function() {
		animation.animationLoop.call(animation, map, master);
		return requestAnimationFrame(beginRender);
	};
	$(function() {
		animation.mainLoop = beginRender();
	});
});