define(["/data/maps/test.js", "/data/maps/moarmaps.js", "animation", "/data/master.js","load"], function(test, moarmaps, animation, master,load) {
	load.ready();
	return {
		maps: {
			test: test,
			moarmaps: moarmaps
		},
		world: master.environment.world.data,
		offsetX: -1,
		offsetY: -1,
		xList: [],
		yList: [],
		minOffset: master.environment.world.data.minOffset,
		maxOffsetX: master.environment.world.data.maxOffsetX,
		maxOffsetY: master.environment.world.data.maxOffsetY,
		currentMap: null,
		sheetImage: null,
		drawnMap: false,
		buildMap: function(name) {
			this.currentMap = this.maps[name];
			this.sheetImage = new Image();
			this.sheetImage.src = this.currentMap.tilesets[0].image;
			this.maxOffsetX = master.environment.world.data.maxOffsetX = this.currentMap.width * 32;
			this.maxOffsetY = master.environment.world.data.maxOffsetY = this.currentMap.width * 32;
			return false;
		},
		animate: function(animation) {
			var thisLayer, l, x, y, tileId, width, tile, thisY, thisX;
			var length = this.currentMap.layers.length;
			if (this.offsetX !== this.world.offsetX || this.offsetY !== this.world.offsetY) {
				this.offsetX = this.world.offsetX;
				this.offsetY = this.world.offsetY;
				this.xList = this.roundBetween(this.offsetX - this.minOffset, this.offsetX + this.minOffset, true);
				this.yList = this.roundBetween(this.offsetY - this.minOffset, this.offsetY + this.minOffset, true);
				this.drawnMap = false;
			}

			if (this.drawnMap === false) {
				for (l = 0; l < length; l++) {
					thisLayer = this.currentMap.layers[l];
					if (thisLayer.name !== "event") {
						animation.setup(thisLayer.name);
						width = thisLayer.width;
						for (x = -1; x < this.xList.length; x++) {
							thisX = this.xList[x + 1];
							for (y = -1; y < this.yList.length; y++) {
								thisY = this.yList[y + 1];
								if (typeof thisLayer.data[(width * thisY) + thisX] === "number") {
									tileId = thisLayer.data[(width * thisY) + thisX] - 1;
									if (tileId !== -1) {
										// console.log(this.currentMap.tileheight * x,this.currentMap.tileheight * y, animation)
										tile = this.currentMap.tilesets[0].tileproperties[tileId];
										animation.context.drawImage(this.sheetImage, this.currentMap.tileheight * tile.x, this.currentMap.tileheight * tile.y, this.currentMap.tileheight, this.currentMap.tileheight, this.currentMap.tileheight * (x + 1) - this.remainder(this.offsetX), this.currentMap.tileheight * (y + 1) - this.remainder(this.offsetY), this.currentMap.tileheight, this.currentMap.tileheight);
									}
								}
							}
						}
					}
				}
				this.drawnMap = true;
			}
			return false;
		},
		remainder: function(number) {
			return number % 32;
		},
		offset: function(number, position) {
			return number - (this["offset" + position] - this.minOffset);
		},
		roundBetween: function(start, end, map) {
			var round = function(number) {
				var num = Math.floor(number / 32);
				if (num < 0) {
					num = 0;
				}
				return num;
			};
			if (start % 32 === 0 && !map) {
				return [round(start)];
			}
			var roundedStart = round(start);
			var roundedEnd = round(end);
			var numbers = [];
			for (var i = roundedStart; i < roundedEnd; i++) {
				numbers.push(i);
			}
			numbers.push(roundedEnd);
			return numbers;
		},
		tileList0: [],
		tileList1: [],
		tileList2: [],
		tileList3: [],
		tileListIndex: 0,
		getTiles: function(xList, yList, debug) {
			var index = this.tileListIndex;
			var results = this["tileList" + index];
			if (results.length) {
				results.length = 0;
			}
			var length = this.currentMap.layers.length;
			for (l = 0; l < length; l++) {
				var thisLayer = this.currentMap.layers[l];
				var width = thisLayer.width;
				for (var x = 0; x < xList.length; x++) {
					var thisX = xList[x];
					for (var y = 0; y < yList.length; y++) {
						var thisY = yList[y];
						var tileId = thisLayer.data[(width * thisY) + thisX] - 1;
						var tiles = this.currentMap.tilesets[0].tileproperties;
						if (tileId === -1) {
							results.push(false)
						} else {
							results.push(tiles[tileId].passable === "false");
						}
					}
				}
			}
			this.tileListIndex++;
			if (this.tileListIndex > 3) {
				this.tileListIndex = 0;
			}
			return results;
		},
		eventDataList0: [],
		eventDataList1: [],
		eventDataList2: [],
		eventDataListIndex: 0,
		events: function(x, y) {
			var index = this.eventDataListIndex;
			var results = this["eventDataList" + index];
			if (results.length) {
				results.length = 0;
			}
			var length = this.currentMap.layers.length;
			for (l = 0; l < length; l++) {
				var thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event") {
					var width = thisLayer.width;
					var tileId = thisLayer.data[(width * y) + x] - 1;
					if (tileId !== -1) {
						var tiles = this.currentMap.tilesets[0].tileproperties;
						if (results[index]) {
							results[index] = tiles[tileId];
						} else {
							results.push(tiles[tileId]);
						}
					}
				}
			}
			this.eventDataListIndex++;
			if (this.eventDataListIndex > 2) {
				this.eventDataListIndex = 0;
			}
			return results;
		},
		xy: {
			x: 0,
			y: 0
		},
		matchDoor: function(originX, originY) {
			var thisLayer, l, x, y, tileId, width, height, tile, searchTile, xy;
			xy = this.xy;
			var length = this.currentMap.layers.length;
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event") {
					width = thisLayer.width;
					height = thisLayer.height;
					searchTile = thisLayer.data[(width * originY) + originX] - 1;
					for (y = 0; y < height; y++) {
						for (x = 0; x < width; x++) {
							tileId = thisLayer.data[(width * y) + x] - 1;
							if (tileId !== -1) {
								if (tileId === searchTile && (originX !== x || originY !== y)) {
									xy.x = x;
									xy.y = y;
									return xy;
								}
							}
						}
					}
				}
			}
			xy.x = originX;
			xy.y = originY;
			return xy;
		}
	};
});