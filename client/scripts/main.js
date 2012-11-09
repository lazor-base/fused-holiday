require.config({
	paths: {
		json: '/3rd_party/json',
		text: '/3rd_party/text'
	}
});
require(["animation", "player", "input", "entity", "/client/data/master.js"], function(animation, player, input, entity, master) {
	input.listen("keydown", function() {
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});
	animation.setup("canvas");
	player.setPlayer(master.characters.mmz);
	var loop = function() {
		animation.context.clearRect(0, 0, canvas.width, canvas.height);
		player.process();
		requestAnimationFrame(loop);
	};
	// needs to be in main file in order to have correct closure variables.
	var beginRender = function() {
		var length = animation.renderList.length;
		for (var i = 0; i < length; i++) {
			if (animation.renderList[i].remove) {
				animation.renderList[i].remove = false;
				animation.renderList.splice(i);
			} else {
				animation.renderList[i].on.animate.call(animation.renderList[i], master.environment, null);
			}
		}
		return requestAnimationFrame(beginRender);
	};
	animation.mainLoop = beginRender();
});