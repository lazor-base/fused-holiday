define(["map","load"], function(map,load) {
	load.ready();
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
				// if (entity.data.moving) {
					modifier = 0;
					if (entity.data.event.walk && entity.data.direction.left) {
						modifier = entity.data.walkSpeed;
					}

					var left = map.getTiles([round(sx - modifier)], map.roundBetween(sy, ey));
					if (sx + modifier <= 0 || left.indexOf(true) > -1) {
						entity.on.collideLeft.call(entity, {
							x: round(sx + modifier)
						});
					}
					modifier = 0;
					if (entity.data.event.walk && entity.data.direction.right) {
						modifier = entity.data.walkSpeed;
					}


					var right = map.getTiles([round(ex + modifier)], map.roundBetween(sy, ey));
					if (ex + modifier >= map.currentMap.width * 32 || right.indexOf(true) > -1) {
						entity.on.collideRight.call(entity, {
							x: round(ex + modifier)
						});
					}
					modifier = 0;
					if (entity.data.event.jump) {
						modifier = Math.floor(2 * entity.data.jumpRate);
					}


					var top = map.getTiles(map.roundBetween(sx, ex), [round(sy + modifier)]);
					if (sy + modifier <= 0 || top.indexOf(true) > -1) {
						entity.on.collideTop.call(entity, {
							y: round(sy + modifier)
						});
					}
				// }
				modifier = 0;
				if (entity.data.event.fall) {
					modifier = Math.floor(2 * entity.data.fallRate);
				}


				var bottom = map.getTiles(map.roundBetween(sx, ex), [round(ey + modifier)]);
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
		}
			return false;
	};
});