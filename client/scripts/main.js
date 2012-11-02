require.config({
	paths: {
		json: '/3rd_party/json',
		text: '/3rd_party/text'
	}
});
require(["animation", "player", "input", "sprite", "walk", "json!/client/data/mmz.animations.json"], function(animation, player, input, sprite, walk, mmz) {
	input.listen("keydown", function() {
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});
	animation.setup("canvas");
	var mainPlayer = player.makePlayer("/client/images/mmz.png", mmz);
	var loop = function() {
		animation.context.clearRect(0, 0, canvas.width, canvas.height);
		player.process();
		requestAnimationFrame(loop);
	};
	var mainLoop = animation.startLoop(loop)
	// walk();
});