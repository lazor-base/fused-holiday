define([], function() {
	return {
		health: 100,
		x: 14*32,
		y: 10*32,
		w: 32,
		h: 32,
		id: "mmz",
		direction: {
			up: false,
			right: false,
			down: false,
			left: false
		},
		event: {
			jump: false,
			fall: true,
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