define(["load"], function(load) {
	load.ready();
	return {
		health: 100,
		x: 15*32,
		y: 9*32,
		w: 32,
		h: 32,
		id: "dummy",
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
		frameData:null,
		jumpRate: -3,
		moving:false,
		jumpForce: -3,
		fallRate: 0,
		isFlipped: false,
		physics: {
			checkAgainst:["map"],
			types:["entity"]
		},
		oldFrame: {
			animation: "",
			index: 0
		}
	};
});