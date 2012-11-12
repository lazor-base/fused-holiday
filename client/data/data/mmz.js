define([], function() {
	return {
		requires: ["animation", "input", "entity"],
		health: 100,
		x: 50,
		y: 50,
		w: 42,
		h: 42,
		id: "mmz",
		direction: {
			up: false,
			right: false,
			down: false,
			left: false
		},
		event: {
			jump: false,
			fall: false,
			walk: false,
			dash: false
		},
		jumpRate: -3,
		jumpForce: -3,
		fallRate: 0,
		isFlipped: false,
		oldFrame: {
			animation: "",
			index: 0
		}
	};
});