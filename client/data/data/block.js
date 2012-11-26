define(["load"], function(load) {
	load.ready();
	return {
		health: 100,
		x: 14*32,
		y: 3*32,
		tileX:14,
		tileY:3,
		w: 64,
		h: 64,
		id: "block",
		action:"idle",
		fallRate: 0,
		passable:false,
		frameData:null,
		onLand:false,
		moveSpeed:1,
		direction: {
			right: false,
			left: false
		},
		event: {
			fall: true,
			move: false
		},
		moving:false,
		blocked: {
			up:false,
			down:false,
			right:false,
			left:false
		},
		physics: {
			checkAgainst:["map", "entity"],
			types:["entity","block"]
		},
		event:{
			fall:true
		}
	};
});