define(["entity", "map"], function(entity, map) {
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
			var tileId = thisLayer.data[(width * y) + x] - 1;
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
			if (contains(checkAgainst, "map")) {
				if (entity.data.event.walk && entity.data.direction.left) {
					modifier = entity.data.walkSpeed;
				}
				var left = mapCollision(round(sx + modifier), round(my));
				if (sx + modifier <= 0 || left) {
					console.log(left)
					entity.on.collideLeft.call(entity, {x:round(sx + modifier)})
				}
				if (entity.data.event.walk && entity.data.direction.right) {
					modifier = entity.data.walkSpeed;
				}
				var right = mapCollision(round(ex + modifier), round(my));
				if (ex + modifier >= map.currentMap.width * 32 || right) {
					console.log(right)
					entity.on.collideRight.call(entity, {x:round(ex + modifier)})
				}
				if (entity.data.event.jump) {
					modifier = Math.floor(2 * entity.data.jumpRate);
				}
				var top = mapCollision(round(mx), round(sy + modifier));
				if (sy + modifier <= 0 || top) {
					console.log(top)
					entity.on.collideTop.call(entity, {y:round(sy + modifier)})
				}
				if (entity.data.event.fall) {
					modifier = Math.floor(2 * entity.data.fallRate);
				}
				var bottom = mapCollision(round(mx), round(ey + modifier));
				if (ey + modifier >= map.currentMap.height * 32 || bottom) {
					entity.on.collideBottom.call(entity, {y:round(ey + modifier)})
				}
			}
		} else {
			return false;
		}
	};
});

function collision(AX1, AY1, AX2, AY2, BX1, BY1, BX2, BY2) {
	if (AX1 < BX1) {
		if (AX2 < BX1) {
			return false;
		} else {
			if (AY1 < BY1) {
				if (AY2 < BY1) {
					return false;
				} else {
					return true;
				}
			} else {
				if (AY1 > BY2) {
					return false;
				} else {
					return true;
				}
			}
		}
	} else {
		if (AX1 > BX2) {
			return false;
		} else {
			if (AY1 < BY1) {
				if (AY2 < BY1) {
					return false;
				} else {
					return true;
				}
			} else {
				if (AY1 > BY2) {
					return false;
				} else {
					return true;
				}
			}
		}
	}
	return false; // should never get here
}