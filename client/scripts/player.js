define(["entity"], function(entity) {
	return {
		player: null,
		setPlayer: function(masterReference) {
			this.player = entity.clone(masterReference);
			entity.animate(this.player);
		}
	};
});