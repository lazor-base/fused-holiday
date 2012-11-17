define([], function() {
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
		physics: {
			checkAgainst:["map"],
			types:["entity","block"]
		},
		event:{
			fall:true
		}
	};
});