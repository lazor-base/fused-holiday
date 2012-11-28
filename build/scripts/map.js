/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["data/maps/test.js","data/maps/test-2.js", "data/maps/moarmaps.js", "animation", "data/master.js", "load"], function(test, test2, moarmaps, animation, master, load) {
	"use strict";
	load.ready();
	return {
		maps: {
			test: test,
			test2: test2,
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
		findBlockSpawns: function() {
			var length = this.currentMap.layers.length;
			var tiles = this.currentMap.tilesets[0].tileproperties;
			var l, x, y, width, thisLayer, tileId, height;
			var results = [];
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event") {
					width = thisLayer.width;
					height = thisLayer.height;
					for (x = 0; x < width; x++) {
						for (y = 0; y < height; y++) {
							tileId = thisLayer.data[(width * y) + x] - 1;
							if (tileId !== -1 && tiles[tileId].event === "blockSpawn") {
								results.push([x,y]);
							}
						}
					}
				}
			}
			return results;
		},
		findKeySpawns: function() {
			var length = this.currentMap.layers.length;
			var tiles = this.currentMap.tilesets[0].tileproperties;
			var l, x, y, width, thisLayer, tileId, height;
			var results = [];
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event") {
					width = thisLayer.width;
					height = thisLayer.height;
					for (x = 0; x < width; x++) {
						for (y = 0; y < height; y++) {
							tileId = thisLayer.data[(width * y) + x] - 1;
							if (tileId !== -1 && tiles[tileId].event === "keySpawn") {
								results.push([tiles[tileId].keyId,x,y]);
							}
						}
					}
				}
			}
			return results;
		},
		findPlayerSpawnX: function() {
			var length = this.currentMap.layers.length;
			var tiles = this.currentMap.tilesets[0].tileproperties;
			var l, x, y, width, thisLayer, tileId, height;
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event") {
					width = thisLayer.width;
					height = thisLayer.height;
					for (x = 0; x < width; x++) {
						for (y = 0; y < height; y++) {
							tileId = thisLayer.data[(width * y) + x] - 1;
							if (tileId !== -1 && tiles[tileId].event === "playerSpawn") {
								return x * 32;
							}
						}
					}
				}
			}
			return false;
		},
		findPlayerSpawnY: function() {
			var length = this.currentMap.layers.length;
			var tiles = this.currentMap.tilesets[0].tileproperties;
			var l, x, y, width, thisLayer, tileId, height;
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event") {
					width = thisLayer.width;
					height = thisLayer.height;
					for (x = 0; x < width; x++) {
						for (y = 0; y < height; y++) {
							tileId = thisLayer.data[(width * y) + x] - 1;
							if (tileId !== -1 && tiles[tileId].event === "playerSpawn") {
								return y * 32;
							}
						}
					}
				}
			}
			return false;
		},
		recalculate: function() {
			if (this.offsetX !== this.world.offsetX || this.offsetY !== this.world.offsetY) {
				this.offsetX = this.world.offsetX;
				this.offsetY = this.world.offsetY;
				this.xList = this.roundBetween(this.offsetX - this.minOffset, this.offsetX + this.minOffset, true);
				this.yList = this.roundBetween(this.offsetY - this.minOffset, this.offsetY + this.minOffset, true);
				this.drawnMap = false;
			}
		},
		animate: function(animation) {
			var thisLayer, l, x, y, tileId, width, tile, thisY, thisX;
			var length = this.currentMap.layers.length;
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
			var roundedStart = round(start);
			var roundedEnd = round(end);
			if (start % 32 === 0 && !map) {
				var length = round(end-start);
				var numbers = [];

				for(var i=0;i<length;i++) {
					numbers.push(roundedStart+i);
				}
				return numbers;
			}
			var numbers = [];
			for (var i = roundedStart; i < roundedEnd; i++) {
				numbers.push(i);
			}
			// console.log(roundedStart,roundedEnd,start,end, map)
			numbers.push(roundedEnd);
			return numbers;
		},
		containsImpassable: function(list) {
			var i = 0;
			for (i = 0; i < list.length; i++) {
				if (list[i][0] && list[i][0].passable === "false") {
					return list[i];
				}
			}
			return false;
		},
		tileList0: [],
		tileList1: [],
		tileList2: [],
		tileList3: [],
		tileListIndex: 0,
		getTiles: function(xList, yList) {
			var l, x, y, length, thisLayer, width, thisX, thisY, tileId, tiles, result;
			var index = this.tileListIndex;
			var localIndex = 0;
			// console.log(xList,yList)
			var results = this["tileList" + index];
			length = this.currentMap.layers.length;
			var initialLength = results.length;
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				width = thisLayer.width;
				for (x = 0; x < xList.length; x++) {
					thisX = xList[x];
					for (y = 0; y < yList.length; y++) {
						thisY = yList[y];
						tileId = thisLayer.data[(width * thisY) + thisX] - 1;
						tiles = this.currentMap.tilesets[0].tileproperties;
						if (tileId !== -1) {
							if (results[localIndex]) {
								results[localIndex] = [tiles[tileId], thisX, thisY];
							} else {
								results.push([tiles[tileId], thisX, thisY]);
							}
							localIndex++;
							// console.log(y, yList,xList.length,yList.length)
						}
					}
				}
			}
			results.length = localIndex;
			// console.log(initialLength,results.length, localIndex,xList.length*yList.length)
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
			var tiles = this.currentMap.tilesets[0].tileproperties;
			var length = this.currentMap.layers.length;
			var thisLayer, width, tileId, l, result;
			var localIndex = 0;
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event") {
					width = thisLayer.width;
					tileId = thisLayer.data[(width * y) + x] - 1;
					if (tileId !== -1) {
						result = tiles[tileId];
						if (results[localIndex]) {
							results[localIndex] = result;
						} else {
							results.push(result);
						}
						localIndex++;
					}
				}
			}
			results.length = localIndex;
			this.eventDataListIndex++;
			if (this.eventDataListIndex > 2) {
				this.eventDataListIndex = 0;
			}
			return results;
		},
		removeDoor: function(x, y) {
			var length = this.currentMap.layers.length;
			var tiles = this.currentMap.tilesets[0].tileproperties;
			var l, i, width, thisLayer, tileId;
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event" || thisLayer.name === "floor") {
					width = thisLayer.width;
					for (i = y - 1; i < y + 2; i++) {
						tileId = thisLayer.data[(width * i) + x] - 1;
						if (tileId !== -1 && (tiles[tileId].group === "door" || (tiles[tileId].event && tiles[tileId].event.indexOf("door") > -1))) {
							thisLayer.data[(width * i) + x] = 0;
							this.drawnMap = false;
						}
					}
				}
			}
			return false;
		},
		xy: {
			x: 0,
			y: 0
		},
		matchDoor: function(originX, originY) {
			var thisLayer, l, x, y, tileId, width, height, searchTile, xy;
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