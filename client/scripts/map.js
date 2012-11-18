define(["/data/maps/test.js", "/data/maps/moarmaps.js", "animation"], function(test, moarmaps, animation) {
	return {
		maps: {
			test: test,
			moarmaps: moarmaps
		},
		currentMap: null,
		sheetImage: null,
		buildMap: function(name) {
			this.currentMap = this.maps[name];
			this.sheetImage = new Image();
			this.sheetImage.src = this.currentMap.tilesets[0].image;
		},
		animate: function(animation) {
			var thisLayer, l, x, y, tileId, width, height, tile;
			var length = this.currentMap.layers.length;
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
				if (thisLayer.name !== "event") {
					animation.setup(thisLayer.name);
					width = thisLayer.width;
					height = thisLayer.height;
					for (y = 0; y < height; y++) {
						for (x = 0; x < width; x++) {
							tileId = thisLayer.data[(width * y) + x] - 1;
							if (tileId !== -1) {
								tile = this.currentMap.tilesets[0].tileproperties[tileId];
								animation.context.drawImage(this.sheetImage, this.currentMap.tileheight * tile.x, this.currentMap.tileheight * tile.y, this.currentMap.tileheight, this.currentMap.tileheight, this.currentMap.tileheight * x, this.currentMap.tileheight * y, this.currentMap.tileheight, this.currentMap.tileheight);
							}
						}
					}
				}
			}
		},
		events: function(x, y) {
			var results = [];
			var length = this.currentMap.layers.length;
			for (l = 0; l < length; l++) {
				var thisLayer = this.currentMap.layers[l];
				if (thisLayer.name === "event") {
					var width = thisLayer.width;
					var tileId = thisLayer.data[(width * y) + x] - 1;
					if (tileId !== -1) {
						var tiles = this.currentMap.tilesets[0].tileproperties;
						results.push(tiles[tileId]);
					}
				}
			}
			return results;
		},
		matchDoor: function(originX, originY) {
			var thisLayer, l, x, y, tileId, width, height, tile, searchTile;
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
							if (tileId === searchTile && originX !== x && originY !== y) {
								return {
									x: x,
									y: y
								};
							}
						}
					}
				}
			}
		}
	};
});