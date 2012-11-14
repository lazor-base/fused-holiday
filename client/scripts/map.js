define(["/client/data/maps.js", "player", "animation"], function(maps, player, animation) {
	return {
		currentMap: null,
		sheetImage: null,
		buildMap: function(name) {
			this.currentMap = maps.maps[name];
			this.sheetImage = new Image();
			this.sheetImage.src = maps.tiles[this.currentMap.sheet].sheet;
		},
		animate: function() { //samantha 6045312611
			var playerData = player.player.data;
			var tiles = maps.tiles[this.currentMap.sheet].data;
			var focusX = Math.round(playerData.x / this.currentMap.size) - 6;
			var focusY = Math.round(playerData.y / this.currentMap.size) - 6;
			for (var y = 0; y < this.currentMap.layers.floor.length; y++) {
				for (var x = 0; x < this.currentMap.layers.floor[y].length; x++) {
					var tileId = this.currentMap.layers.floor[y][x];
					if (tileId !== -1) {
						animation.context.drawImage(this.sheetImage, this.currentMap.size * tiles[tileId].x, this.currentMap.size * tiles[tileId].y, this.currentMap.size, this.currentMap.size, this.currentMap.size * x, this.currentMap.size * y, this.currentMap.size, this.currentMap.size);
					}
				}
			}
		},
		collide: function(x,y) {
			var tileId = this.currentMap.layers.floor[y][x];
			var tiles = maps.tiles[this.currentMap.sheet].data;
			if(tileId === -1) {
				return false;
			}
			return tiles[tileId];
		}
	};
});