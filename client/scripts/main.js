require(["animation", "player", "input", "entity", "map", "/client/data/maps.js", "/client/data/master.js"], function(animation, player, input, entity, map, maps, master) {

	input.listen("keydown", function() {
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});
	map.buildMap("test")
	// animation.setup("player");
	// animation.setup("objects");
	player.setPlayer(master.characters.mmz);
	entity.spawn(master.characters.block,{});
	var dudes = 0;
	// needs to be in main file in order to have correct closure variables.
	var beginRender = function() {
		function randomFromInterval(from, to) {
			return Math.floor(Math.random() * (to - from + 1) + from);
		}
		if (input.keys.z) {
			dudes++;
			entity.spawn(master.characters.dummy, {
				x: randomFromInterval(1, map.currentMap.layers.floor[0].length-1)*32,
				y: randomFromInterval(1, map.currentMap.layers.floor.length-1)*32
			});
		}
		if (input.keys.x) {
			if (animation.renderList.length > 0) {
				animation.renderList[0].remove = true;
				dudes--;
			}
		}
		map.animate();
		animation.setup("player");
		player.player.on.animate.call(player.player, master.environment, {
			context: animation.context,
			id: "player"
		});
		animation.setup("objects");
		var length = animation.renderList.length;
		for (var i = 0; i < length; i++) {
			if (animation.renderList[i].remove) {
				animation.renderList[i].on.destroy.call(animation.renderList[i], null, {
					context: animation.context,
					id: "objects"
				});
				animation.renderList.splice(i);
				length = animation.renderList.length;
				i--;
			} else {
				animation.renderList[i].on.animate.call(animation.renderList[i], master.environment, {
					context: animation.context,
					id: "objects"
				});
			}
		}
		document.getElementById("dudes").innerText = dudes;
		return requestAnimationFrame(beginRender);
	};
	animation.mainLoop = beginRender();
});