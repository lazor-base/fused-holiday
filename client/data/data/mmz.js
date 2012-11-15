define([], function() {
	return {
		health: 100,
		x: 14*32,
		y: 10*32,
		tileX:14,
		tileY:10,
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
			dash: false,
			climb: false,
			action: false,
			stop: false
		},
		lastDirection: "right",
		action:"stand",
		onLand:false,
		jumpRate: -3,
		jumpForce: -3,
		fallRate: 0,
		frameData:null,
		isFlipped: false,
		oldFrame: {
			animation: "",
			index: 0
		}
	};
});