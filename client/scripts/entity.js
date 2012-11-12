define(["animation", "parseJSON"], function(animation, parseJSON) {
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
		master: {
			characters: {},
			tiles: {},
			objects: {},
			tools: {},
			environment:{}
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
		make: function(spriteSheetPath, type, animationJSON, dataJSON, eventJSON) {
			this.master[type] = this.master[type] || {};
			this.master[type][dataJSON.id] = {
				spriteSheet: spriteSheetPath,
				image: null,
				counter: 0,
				animations: this.cloneObject(animationJSON),
				data: this.cloneObject(dataJSON),
				on: this.cloneObject(eventJSON)
			};
			return this.master[type][dataJSON.id];
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
			if (entity.image === null) {
				var image = new Image();
				image.src = entity.spriteSheet;
				entity.image = image;
			}
			clone.image = entity.image;
			return clone;
		},
		/**
		 * puts a reference to an entity in the draw loop. Best called after entity.clone()
		 * @param  {Object} entity Reference to master entity to copy.
		 */
		animate: function(entity) {
			animation.renderList.push(entity);
		},
		/**
		 * Create a string copy of the master object.
		 * @return {String} JSON string of master object.
		 */
		print: function(type) {
			return parseJSON["to" + type](this.master);
		}
	};
});