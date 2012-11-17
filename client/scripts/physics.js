define(["map"], function(map) {
	var contains = function(item, content) {
		return item.indexOf(content) > -1;
	};
	var round = function(number) {
		var num = Math.floor(number / 32);
		if (num < 0) {
			num = 0;
		}
		return num;
	};
	var mapCollision = function(x, y) {
		var results = false;
		var length = map.currentMap.layers.length;
		for (l = 0; l < length; l++) {
			var thisLayer = map.currentMap.layers[l];
			var width = thisLayer.width;
			var tileId = thisLayer.data[(width * round(y)) + round(x)] - 1;
			if (tileId !== -1) {
				var tiles = map.currentMap.tilesets[0].tileproperties;
				if (tiles[tileId].passable === "false") {
					results = tiles[tileId];
				}
			}
		}
		return results;
	};
	var roundBetween = function(start, end) {
		if (start % 32 === 0) {
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
	};
	var getTiles = function(xList, yList, debug) {
		var tileResult = [];
		var length = map.currentMap.layers.length;
		for (l = 0; l < length; l++) {
			var thisLayer = map.currentMap.layers[l];
			var width = thisLayer.width;
			for (var x = 0; x < xList.length; x++) {
				var thisX = xList[x];
				for (var y = 0; y < yList.length; y++) {
					var thisY = yList[y];
					var tileId = thisLayer.data[(width * thisY) + thisX] - 1;
					var tiles = map.currentMap.tilesets[0].tileproperties;
					if (tileId === -1) {
						tileResult.push(false)
					} else {
						tileResult.push(tiles[tileId].passable === "false");
					}
				}
			}
		}
		return tileResult;
	};
	return function Physics(entity, renderList) {
		var checkAgainst = entity.data.physics.checkAgainst;
		var types = entity.data.physics.types;
		if (entity.data.physics.checkAgainst.length > 0) {
			var sx = entity.data.x - entity.data.frameData.cpx;
			var sy = entity.data.y - entity.data.frameData.cpy;
			var ex = sx + entity.data.w;
			var ey = sy + entity.data.h;
			var mx = (sx + ex) / 2;
			var my = (sy + ey) / 2;
			var modifier = 0;
			var tsx, tsy, tex, tey;
			if (contains(checkAgainst, "map")) {
				modifier = 0;
				if (entity.data.event.walk && entity.data.direction.left) {
					modifier = entity.data.walkSpeed;
				}
				tsx = round(sx - modifier) * 32;
				tsy = round(my) * 32;
				tex = tsx + 32;
				tey = tsy + 32;
				var left = getTiles([round(sx - modifier)], roundBetween(sy, ey));
				if (sx + modifier <= 0 || left.indexOf(true) > -1) {
					entity.on.collideLeft.call(entity, {
						x: round(sx + modifier)
					});
				}
				modifier = 0;
				if (entity.data.event.walk && entity.data.direction.right) {
					modifier = entity.data.walkSpeed;
				}
				tsx = round(ex + modifier) * 32;
				tsy = round(my) * 32;
				tex = tsx + 32;
				tey = tsy + 32;


				var right = getTiles([round(ex + modifier)], roundBetween(sy, ey));
				if (ex + modifier >= map.currentMap.width * 32 || right.indexOf(true) > -1) {
					entity.on.collideRight.call(entity, {
						x: round(ex + modifier)
					});
				}
				modifier = 0;
				if (entity.data.event.jump) {
					modifier = Math.floor(2 * entity.data.jumpRate);
				}
				tsx = round(mx) * 32;
				tsy = round(sy - modifier) * 32;
				tex = tsx + 32;
				tey = tsy + 32;

				var top = getTiles(roundBetween(sx, ex), [round(sy + modifier)]);
				if (sy + modifier <= 0 || top.indexOf(true) > -1) {
					entity.on.collideTop.call(entity, {
						y: round(sy + modifier)
					});
				}
				modifier = 0;
				if (entity.data.event.fall) {
					modifier = Math.floor(2 * entity.data.fallRate);
				}
				tsx = round(mx) * 32;
				tsy = round(ey + modifier) * 32;
				tex = tsx + 32;
				tey = tsy + 32;

				var bottom = getTiles(roundBetween(sx, ex), [round(ey + modifier)]);
				if (ey + modifier >= map.currentMap.height * 32 || bottom.indexOf(true) > -1) {
					entity.on.collideBottom.call(entity, {
						y: round(ey + modifier)
					});
				}
			}
			if (contains(checkAgainst, "entity")) {
				for (var i = 0; i < renderList.length; i++) {
					var target = renderList[i];
					if (target.data.uniqueId !== entity.data.uniqueId && contains(target.data.physics.types, "entity")) {
						var tsx = target.data.x - target.data.frameData.cpx;
						var tsy = target.data.y - target.data.frameData.cpy;
						var tex = tsx + target.data.w;
						var tey = tsy + target.data.h;
						var tmx = (tsx + tex) / 2;
						var tmy = (tsy + tey) / 2;
					}
				}
			}
		} else {
			return false;
		}
	};
});