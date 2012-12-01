/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define(["animation"], function(animation) {
	"use strict";
	return {
		/**
		 * Copy readable properties to a new object and return the clone.
		 * @param  {Object}  object  Object to clone.
		 * @param  {Boolean} isArray Whether the object is an array.
		 * @return {Object}          Cloned Object.
		 */
		cloneObject: function(object, isArray) {
			var newObject, i, attr;
			if (isArray) {
				newObject = [];
				for (i = 0; i < object.length; i++) {
					if (typeof object[i] === "object") {
						newObject.push(this.cloneObject(object[i], Array.isArray(object[i])));
					} else {
						newObject.push(object[i]);
					}
				}
			} else {
				newObject = {};
				for (attr in object) {
					if (typeof object[attr] === "object") {
						newObject[attr] = this.cloneObject(object[attr], Array.isArray(object[attr]));
					} else {
						newObject[attr] = object[attr];
					}
				}
			}
			return newObject;
		},
		inGame: [],
		master: {
			characters: {},
			tiles: {},
			objects: {},
			tools: {},
			environment: {}
		},
		/**
		 * Create a new master copy entity.
		 * @param  {String} spriteSheetPath Absolute path (e.g. /client/images/...) to sprite sheet.
		 * @param  {String} type            Type of entity.
		 * @param  {Object} animationJSON   Animation data for this entity.
		 * @param  {Object} dataJSON        Data for this entity.
		 * @param  {Object} eventJSON       Events for this entity.
		 * @return {Object}                 Reference to the master entity.
		 */
		make: function(master, spriteSheetPath, type, animationJSON, dataJSON, eventJSON) {
			master[type] = master[type] || {};
			master[type][dataJSON.id] = {
				spriteSheet: spriteSheetPath,
				image: null,
				remove:false,
				counter: 0,
				animations: this.cloneObject(animationJSON),
				data: this.cloneObject(dataJSON),
				on: this.cloneObject(eventJSON)
			};
			return master[type][dataJSON.id];
		},
		/**
		 * Whether entity is moving.
		 * @param  {Object}  entity Reference pointing to an entity.
		 * @return {Boolean}        Whether the entity is moving.
		 */
		isMoving: function(entity) {
			var object = entity.data.event;
			if (object) {
				for (var attr in object) {
					if (object.hasOwnProperty(attr) && object[attr]) {
						return true;
					}
				}
			}
			return false;
		},
		stop: function(entity) {
			var object = entity.data.event;
			if (object) {
				for (var attr in object) {
					if (object.hasOwnProperty(attr)) {
						entity.data.event[attr] = false;
					}
				}
				return true;
			}
			return false;
		},
		/**
		 * Clone an entity for use in game.
		 * @param  {Object} entity Reference to master entity to copy.
		 * @return {Object}        Cloned entity for use in game.
		 */
		clone: function(entity) {
			var clone = this.cloneObject(entity);
			var image = new Image();
			image.src = entity.spriteSheet;
			// entity.image = image;
			clone.image = image;
			clone.data.uniqueId = Math.floor(Math.random() * 1000000)+1;
			clone.data.frameData = clone.animations[clone.data.action].frames[0];
			return clone;
		},
		spawn: function(entity, attributes, renderList) {
			var object = this.clone(entity);
			for (var attr in attributes) {
				if (attributes.hasOwnProperty(attr)) {
					object.data[attr] = attributes[attr];
				}
			}
			this.inGame.push(object);
			renderList.push(object);
			return false;
		},
		booleanToNumber: function(bool) {
			if (bool) {
				return 1;
			} else {
				return 0;
			}
		},
		getEntity: function(id, animation) {
			for(var i=0;i<animation.renderList.length;i++) {
				var item = animation.renderList[i];
				if(item.data.uniqueId === id) {
					return item;
				}
			}
		},
		collide: function(entity) {
			var result = [];
			var sx = entity.data.x - entity.data.frameData.cpx;
			var sy = entity.data.y - entity.data.frameData.cpy;
			var ex = sx + entity.data.w;
			var ey = sy + entity.data.h;
			for (var i = 0; i < animation.renderList.length; i++) {
				var target = animation.renderList[i];
				var tsx = target.data.x;
				var tsy = target.data.y;
				var tex = tsx + target.data.w;
				var tey = tsy + target.data.h;
				animation.context.fillRect(sx, sy, 32, 32);
				animation.context.fillRect(tsx, tsy, target.data.w, target.data.h);
				if (sx - this.booleanToNumber(entity.data.direction.left) <= tex && (sy <= tey && ey >= tsy) && sx - this.booleanToNumber(entity.data.direction.left) >= tsx) {
					result.push({
						direction: "left",
						target: target
					});
				}
				if (ex + this.booleanToNumber(entity.data.direction.right) >= tsx && (sy <= tey && ey >= tsy) && ex + this.booleanToNumber(entity.data.direction.right) <= tex) {
					result.push({
						direction: "right",
						target: target
					});
				}
				if (sy - this.booleanToNumber(entity.data.event.jump) <= tey && (sx <= tex && ex >= tsx) && sy - this.booleanToNumber(entity.data.event.jump) >= tsy) {
					result.push({
						direction: "top",
						target: target
					});
				}
				if (ey + this.booleanToNumber(entity.data.event.fall) >= tsy && (sx <= tex && ex >= tsx) && ey + this.booleanToNumber(entity.data.event.fall) <= tey) {
					result.push({
						direction: "bottom",
						target: target
					});
				}
			}
			return result;
		}
	};
});