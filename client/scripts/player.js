define(["sprite", "input", "entity"], function(sprite, input, entity) {
	return {
		player: null,
		setPlayer: function(reference) {
			this.player = entity.clone(reference);
			// entity.animate(this.player);
		}
	};
});