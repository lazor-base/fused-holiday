define(["/client/data/maps/test.js", "player", "animation"], function(test, player, animation) {
	return {
		maps: {
			test: test
		},
		currentMap: null,
		sheetImage: null,
		buildMap: function(name) {
			this.currentMap = this.maps[name];
			this.sheetImage = new Image();
			this.sheetImage.src = this.currentMap.tilesets[0].image;
		},
		animate: function() {
			// var playerData = player.player.data;
			// var tiles = maps.tiles[this.currentMap.sheet].data;
			// var focusX = Math.round(playerData.x / this.currentMap.size) - 6;
			// var focusY = Math.round(playerData.y / this.currentMap.size) - 6;
			var thisLayer, l, x, y, tileId, width, height, tile;
			var length = this.currentMap.layers.length;
			for (l = 0; l < length; l++) {
				thisLayer = this.currentMap.layers[l];
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
			// for (var y = 0; y < this.currentMap.layers.floor.length; y++) {
			// 	for (var x = 0; x < this.currentMap.layers.floor[y].length; x++) {
			// 		var tileId = this.currentMap.layers.floor[y][x];
			// 		if (tileId !== -1) {
			// 			animation.context.drawImage(this.sheetImage, this.currentMap.size * tiles[tileId].x, this.currentMap.size * tiles[tileId].y, this.currentMap.size, this.currentMap.size, this.currentMap.size * x, this.currentMap.size * y, this.currentMap.size, this.currentMap.size);
			// 		}
			// 	}
			// }
		},
		collide: function(x, y) {
			var results = [];
			var length = this.currentMap.layers.length;
			for (l = 0; l < length; l++) {
				var thisLayer = this.currentMap.layers[l];
				var width = thisLayer.width;
				var tileId = thisLayer.data[(width * y) + x] - 1;
				if (tileId !== -1) {
					var tiles = this.currentMap.tilesets[0].tileproperties;
					results.push(tiles[tileId]);
				}
			}
			return results;
		}
	};
});