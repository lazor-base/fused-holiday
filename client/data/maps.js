define([], function() {
	return {
		maps: {
			test: {
				sheet:0,
				size:32,
				layers: {
					collision: [],
					floor: [
						[14, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 14],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4,  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4,  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4,  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4,  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4,  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4,  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2,  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7,  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5],
						[14, 3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  14]
					],
					background: []
				}
			}
		},
		tiles: [{
			sheet: "/client/images/tiles.png",
			size: 32,
			data: [{
				name: "left_wall",
				group:"wall",
				passable: false,
				index:0,
				x: 0,
				y: 0
			}, {
				name: "floor_both",
				group:"wall",
				passable: false,
				index:1,
				x: 0,
				y: 1
			}, {
				name: "wall_end_bottom",
				group:"wall",
				passable: false,
				index:2,
				x: 0,
				y: 2
			}, {
				name: "floor",
				group:"wall",
				passable: false,
				index:3,
				x: 1,
				y: 0
			}, {
				name: "wall_both",
				group:"wall",
				passable: false,
				index:4,
				x: 1,
				y: 1
			}, {
				name: "right_wall",
				group:"wall",
				passable: false,
				index:5,
				x: 2,
				y: 0
			}, {
				name: "roof",
				group:"wall",
				passable: false,
				index:6,
				x: 2,
				y: 1
			}, {
				name: "door_base",
				group:"door",
				passable: false,
				index:7,
				x: 3,
				y: 0
			}, {
				name: "ladder_left",
				group:"empty",
				passable: true,
				index:8,
				x: 3,
				y: 1
			}, {
				name: "door_top",
				group:"door",
				passable: false,
				index:9,
				x: 4,
				y: 0
			}, {
				name: "ladder_mid",
				group:"ladder",
				passable: true,
				index:10,
				x: 4,
				y: 1
			}, {
				name: "door_mid",
				group:"door",
				passable: false,
				index:11,
				x: 5,
				y: 0
			}, {
				name: "ladder_right",
				group:"empty",
				passable: true,
				index:12,
				x: 5,
				y: 1
			}, {
				name: "background",
				group:"empty",
				passable: true,
				index:13,
				x: 1,
				y: 2
			}, {
				name: "wall",
				group:"wall",
				passable: false,
				index:14,
				x: 2,
				y: 2
			}]
		}]
	};
});