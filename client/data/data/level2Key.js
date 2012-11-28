define([], function() {
	return {
		health: 100,
		x: 14 * 32,
		y: 3 * 32,
		tileX: 14,
		tileY: 3,
		w: 29,
		h: 26,
		id: "level2",
		collected: false,
		action: "idle",
		fallRate: 0,
		passable: false,
		frameData: null,
		onLand: false,
		moveSpeed: 1,
		uniqueId: 0,
		direction: {
			right: false,
			left: false,
			up: false,
			down: false
		},
		event: {
			fall: false,
			move: false,
			drag: false
		},
		moving: false,
		blocked: {
			up: false,
			down: false,
			right: false,
			left: false
		},
		physics: {
			checkAgainst: ["map", "entity"],
			types: ["key"]
		}
	};
});