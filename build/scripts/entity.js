define([ "animation" ], function(animation) {
    return {
        cloneObject: function(object, isArray) {
            if (isArray) {
                var newObject = [];
                for (var i = 0; i < object.length; i++) typeof object[i] == "object" ? newObject.push(this.cloneObject(object[i], Array.isArray(object[i]))) : newObject.push(object[i]);
            } else {
                var newObject = {};
                for (var attr in object) typeof object[attr] == "object" ? newObject[attr] = this.cloneObject(object[attr], Array.isArray(object[attr])) : newObject[attr] = object[attr];
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
        make: function(master, spriteSheetPath, type, animationJSON, dataJSON, eventJSON) {
            return master[type] = master[type] || {}, master[type][dataJSON.id
] = {
                spriteSheet: spriteSheetPath,
                image: null,
                counter: 0,
                animations: this.cloneObject(animationJSON),
                data: this.cloneObject(dataJSON),
                on: this.cloneObject(eventJSON)
            }, master[type][dataJSON.id];
        },
        isMoving: function(entity) {
            if (entity.data.event) for (var attr in entity.data.event) if (entity.data.event[attr]) return console.log(attr), !0;
            return !1;
        },
        stop: function(entity) {
            if (entity.data.event) {
                for (var attr in entity.data.event) entity.data.event[attr] = !1;
                return !0;
            }
            return !1;
        },
        clone: function(entity) {
            var clone = this.cloneObject(entity), image = new Image;
            return image.src = entity.spriteSheet, clone.image = image, clone.data.uniqueId = Math.floor(Math.random() * 1e6), clone.data.frameData = 
clone.animations[clone.data.action].frames[0], clone;
        },
        spawn: function(entity, attributes, renderList) {
            var object = this.clone(entity);
            for (var attr in attributes) object.data[attr] = attributes[attr];
            return this.inGame.push(object), renderList.push(object), !1;
        },
        collide: function(entity) {
            var result = [], sx = entity.data.x - entity.data.frameData.cpx, sy = entity.data.y - entity.data.frameData.cpy, ex = sx + entity.data.w, ey = sy + entity.data.h, mx = (sx + ex) / 2, my = (sy + ey) / 2;
            for (var i = 0; i < animation.renderList.length; i++) {
                var target = animation.renderList[i], tsx = target.data.x, tsy = target.data.y, tex = tsx + target.data.w, tey = tsy + target.data.h, tmx = (tsx + tex) / 2, tmy = (tsy + tey) / 2;
                animation.context.fillRect(sx, sy, 32, 32), animation.context.fillRect(tsx, tsy, target.data.w, target.data.h), sx - (entity.data.direction
.left === !0) <= tex && sy <= tey && ey >= tsy && sx - (entity.data.direction.left === !0) >= tsx && result.push({
                    direction: "left",
                    target: target
                }), ex + (entity.data.direction.right === !0) >= tsx && sy <= tey && ey >= tsy && ex + (entity.data.direction.right === !0) <= tex && result.push({
                    direction: "right",
                    target: target
                }), sy - (entity.data.event.jump === !0) <= tey && sx <= tex && ex >= tsx && sy - (entity.data.event.jump === !0) >= tsy && result.push({
                    direction: "top",
                    target: target
                }), ey + (entity.data.event.fall === !0) >= tsy && sx <= tex && ex >= tsx && ey + (entity.data.event.fall === !0) <= tey && result.push({
                    direction: "bottom",
                    target: target
                });
            }
            return result;
        }
    };
});