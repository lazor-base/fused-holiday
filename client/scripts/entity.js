define(["animation"], function(animation) {
	return {
		/**
		 * Copy readable properties to a new object and return the clone.
		 * @param  {Object}  object  Object to clone.
		 * @param  {Boolean} isArray Whether the object is an array.
		 * @return {Object}          Cloned Object.
		 */
		cloneObject: function(object, isArray) {
			if (isArray) {
				var newObject = [];
				for (var i = 0; i < object.length; i++) {
					if (typeof object[i] === "object") {
						newObject.push(this.cloneObject(object[i], Array.isArray(object[i])));
					} else {
						newObject.push(object[i]);
					}
				}
			} else {
				var newObject = {};
				for (var attr in object) {
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
			if (entity.data.event) {
				for (var attr in entity.data.event) {
					if (entity.data.event[attr]) {
						console.log(attr)
						return true;
					}
				}
			}
			return false;
		},
		stop: function(entity) {
			if (entity.data.event) {
				for (var attr in entity.data.event) {
					entity.data.event[attr] = false;
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
			clone.data.frameData = clone.animations[clone.data.action].frames[0];
			return clone;
		},
		/**
		 * Create a string copy of the master object.
		 * @return {String} JSON string of master object.
		 */
		print: function(type) {
			return parseJSON["to" + type](this.master);
		},
		spawn: function(entity, attributes, renderList) {
			var object = this.clone(entity);
			for (var attr in attributes) {
				object.data[attr] = attributes[attr];
			}
			this.inGame.push(object);
			renderList.push(object);
		},
		collide: function(entity) {
			var result = [];
			var sx = entity.data.x - entity.data.frameData.cpx;
			var sy = entity.data.y - entity.data.frameData.cpy;
			var ex = sx + entity.data.w;
			var ey = sy + entity.data.h;
			var mx = (sx + ex) / 2;
			var my = (sy + ey) / 2;
			for (var i = 0; i < animation.renderList.length; i++) {
				var target = animation.renderList[i];
				var tsx = target.data.x;
				var tsy = target.data.y;
				var tex = tsx + target.data.w;
				var tey = tsy + target.data.h;
				var tmx = (tsx + tex) / 2;
				var tmy = (tsy + tey) / 2;
				animation.context.fillRect(sx, sy, 32, 32)
				animation.context.fillRect(tsx, tsy, target.data.w, target.data.h)
				if (sx - !! (entity.data.direction.left === true) <= tex && (sy <= tey && ey >= tsy) && sx - !! (entity.data.direction.left === true) >= tsx) {
					result.push({
						direction: "left",
						target: target
					});
				}
				if (ex + !! (entity.data.direction.right === true) >= tsx && (sy <= tey && ey >= tsy) && ex + !! (entity.data.direction.right === true) <= tex) {
					result.push({
						direction: "right",
						target: target
					});
				}
				if (sy - !! (entity.data.event.jump === true) <= tey && (sx <= tex && ex >= tsx) && sy - !! (entity.data.event.jump === true) >= tsy) {
					result.push({
						direction: "top",
						target: target
					});
				}
				if (ey + !! (entity.data.event.fall === true) >= tsy && (sx <= tex && ex >= tsx) && ey + !! (entity.data.event.fall === true) <= tey) {
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