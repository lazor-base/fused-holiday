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
		fallRate: 0,
		passable:false,
		frameData:null,
		event:{
			fall:true
		}
	};
});