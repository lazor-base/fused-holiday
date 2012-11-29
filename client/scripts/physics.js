/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["map"], function(map) {
	"use strict";
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
	return function Physics(entity, renderList) {
		var checkAgainst = entity.data.physics.checkAgainst;
		if (entity.data.physics.checkAgainst.length > 0) {
			var sx = entity.data.x - entity.data.frameData.cpx;
			var sy = entity.data.y - entity.data.frameData.cpy;
			var ex = sx + entity.data.w;
			var ey = sy + entity.data.h;
			var tsx, tsy, tex, tey, target, i, top, right, bottom, left, result, leftModifier, rightModifier, topModifier, bottomModifier;
			leftModifier = rightModifier = topModifier = bottomModifier = 0;
			leftModifier = entity.data.moveSpeed;
			rightModifier = entity.data.moveSpeed;
			if (entity.data.event.walk && entity.data.direction.right) {
				rightModifier = entity.data.moveSpeed;
			}
			if (entity.data.event.jump) {
				topModifier = Math.floor(2 * entity.data.jumpRate);
			}
			if (entity.data.event.fall) {
				bottomModifier = Math.floor(2 * entity.data.fallRate);
			}
			if (contains(checkAgainst, "map")) {
				left = map.getTiles([round(sx - leftModifier)], map.roundBetween(sy, ey));
				result = map.containsImpassable(left);
				if (sx - leftModifier <= 0 || result) {
					entity.on.collideLeft(entity, result[1], result[2], result[0]);
				}

				right = map.getTiles([round(ex + rightModifier)], map.roundBetween(sy, ey));
				result = map.containsImpassable(right);
				if (ex + rightModifier >= map.currentMap.width * 32 || result) {
					entity.on.collideRight(entity, result[1], result[2], result[0]);
				}


				top = map.getTiles(map.roundBetween(sx, ex), [round(sy + topModifier)]);
				result = map.containsImpassable(top);
				if (sy + topModifier <= 0 || result) {
					entity.on.collideTop(entity, result[1], result[2], result[0]);
				}


				bottom = map.getTiles(map.roundBetween(sx, ex), [round(ey + bottomModifier)]);
				result = map.containsImpassable(bottom);
				if (ey + bottomModifier >= map.currentMap.height * 32 || result) {
					entity.on.collideBottom(entity, result[1], result[2], result[0]);
				}
			}
			if (contains(checkAgainst, "entity")) {
				for (i = 0; i < renderList.length; i++) {
					target = renderList[i];
					if (target.data.uniqueId !== entity.data.uniqueId && contains(target.data.physics.types, "entity")) {
						tsx = target.data.x - target.data.frameData.cpx;
						tsy = target.data.y - target.data.frameData.cpy;
						tex = tsx + target.data.w;
						tey = tsy + target.data.h;
						var collision = false;
						var directions = [];
						if (sx < tsx) {
							if (ex < tsx) {
								collision = false;
							} else {
								// right
								if (sy < tsy) {
									if (ey < tsy) {
										collision = false;
									} else {
										collision = "1";
									}
								} else {
									if (sy > tey) {
										collision = false;
									} else {
										collision = "2";
									}
								}
							}
						} else {
							if (sx > tex) {
								collision = false;
							} else {
								// left
								if (sy < tsy) {
									if (ey < tsy) {
										collision = false;
									} else {
										collision = "3";
									}
								} else {
									if (sy > tey) {
										collision = false;
									} else {
										collision = "4";
									}
								}
							}
						}
						if (contains(entity.data.physics.types, "player") && contains(target.data.physics.types, "block") && collision) {
							// console.log("top",sy + topModifier <= tey && collision && ey + topModifier > tey && entity.data.direction.up && ((ex > tsx && sx < tsx) || (sx < tex && ex > tex) || (sx >= tsx && ex <= tex)))
						}
						if (sx - leftModifier < tex && collision && ex - leftModifier > tex && ((ey > tsy && sy < tsy) || (sy < tey && ey > tey) || (sy >= tsy && ey <= tey))) {
							collision = false;
							entity.on.collideLeft(entity, round(tsx), round(sy), target);
						}
						if (contains(entity.data.physics.types, "player") && contains(target.data.physics.types, "block")) {
							// console.log(target.data.direction.left,target.data.direction.right, target.data.event.move)
						}
						if (ex + rightModifier > tsx && collision && sx + rightModifier < tsx && ((ey > tsy && sy < tsy) || (sy < tey && ey > tey) || (sy >= tsy && ey <= tey))) {
							collision = false;
							entity.on.collideRight(entity, round(tex), round(sy), target);
						}

						if (sy + topModifier <= tey && collision && ey + topModifier > tey && entity.data.direction.up && ((ex > tsx && sx < tsx) || (sx < tex && ex > tex) || (sx >= tsx && ex <= tex))) {
							entity.on.collideTop(entity, round(sx), round(tey), target);
							collision = false;
						}
						if (contains(entity.data.physics.types, "player") && contains(target.data.physics.types, "block") && collision) {
							// console.log("bottom",ey + bottomModifier >= tsy && collision && sy + bottomModifier < tsy && entity.data.direction.down && ((ex > tsx && sx < tsx) || (sx < tex && ex > tex) || (sx >= tsx && ex <= tex)))
						}
						if (ey + bottomModifier >= tsy && collision && sy + bottomModifier < tsy /*&& entity.data.direction.down*/ && ((ex > tsx && sx < tsx) || (sx < tex && ex > tex) || (sx >= tsx && ex <= tex))) {
							entity.on.collideBottom(entity, round(sx), round(tsy), target);
							collision = false;
						}
						if (contains(entity.data.physics.types, "player") && contains(target.data.physics.types, "block") && collision) {
							// console.log("left",sx - leftModifier < tex && collision && ex - leftModifier > tex && ((ey > tsy && sy < tsy) || (sy < tey && ey > tey) || (sy >= tsy && ey <= tey)))
						}
					}
				}
			}
		}
		return false;
	};
});