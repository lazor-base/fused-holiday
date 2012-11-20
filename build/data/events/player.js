define([ "animation", "input", "map", "entity" ], function(animation, input, map, entity) {
    return {
        walk: function(target, event) {
            if (this.data.event.stop) return this.data.event.stop = !1, !0;
            if (this.data.event.climb && !this.data.event.fall) return !0;
            input.keys.left || input.keys.right ? (this.data.event.walk = !0, this.data.event.stand = !1) : (this.data.event.walk = !1, this.data.event.stand = !0);
            if (input.keys.left && input.keys.right) {
                if (this.data.direction.right || this.data.direction.left) this.counter = 0;
            } else this.data.event.walk && (input.keys.right === !0 && this.data.blocked.right === !1 ? (this.data.moving = !0, this.data.x = this.data.x + this.data.walkSpeed) : input.keys.left === !0 && this.data.blocked.left === !1 && (this.data.moving = !0, this.data.x = this.data.x - this.data.walkSpeed));
            return input.keys.right === !1 && this.data.direction.right === !0 && 
(this.counter = 0), input.keys.left === !1 && this.data.direction.left === !0 && (this.counter = 0), !1;
        },
        moveDoors: function(map) {
            if (this.data.travel) {
                if (this.data.tileX === this.data.targetDoor.x && this.data.tileY === this.data.targetDoor.y) return this.data.travel = !1, !0;
                this.data.tileX < this.data.targetDoor.x && (this.data.x += 16), this.data.tileX > this.data.targetDoor.x && (this.data.x -= 16), this.data.tileY < this.data.targetDoor.y && (this.data.y += 16), this.data.tileY > this.data.targetDoor.y && (this.data.y -= 16);
            }
            return !1;
        },
        door: function(target, event) {
            this.data.coolDown = 10;
            if (event.door) {
                var target = event.map.matchDoor(event.x, event.y);
                this.data.targetDoor.x = target.x, this.data.targetDoor.y = target.y;
            } else this.data.targetDoor.y = event.y, this.data.direction.left ? this.
data.targetDoor.x = event.x - 1 : this.data.direction.right && (this.data.targetDoor.x = event.x + 1);
            return this.data.travel = !0, !1;
        },
        climb: function(target, context, map) {
            var find = function(list, type) {
                if (list) for (var i = 0; i < list.length; i++) {
                    !list[i];
                    if (list[i].event.indexOf(type) > -1) return list[i];
                }
                return !1;
            }, climbUp = function() {
                return this.data.moving = !0, this.data.fallRate = 0, this.data.jumpRate = this.data.jumpForce, this.data.action = "climb", this.data.event.jump = !1, this.data.event.fall = !1, this.data.y = this.data.y - 1, this.data.onLand = !1, this.counter++, this.data.event.climb = !0, !1;
            }, climDown = function() {
                return this.data.moving = !0, this.data.fallRate = 0, this.data.jumpRate = this.data.jumpForce, this.data.action = "climb", this.data.event.jump = !1
, this.data.event.fall = !1, this.data.y = this.data.y + 1, this.data.onLand = !1, this.counter++, this.data.event.climb = !0, !1;
            }, fall = function() {
                return !this.data.onLand && this.data.event.climb && (this.data.event.fall = !0), !1;
            }, collideData, data, x = this.data.tileX, y = this.data.tileY, current = map.events(x, y), above = map.events(x, y - 1), below = map.events(x, y + 1);
            return input.keys.up === !0 ? (this.data.event.jump || this.data.event.fall) && !this.data.event.climb ? climbUp.call(this) : find(current, "ladder") && !find(above, "ladder") ? climbUp.call(this) : find(current, "ladder") && find(above, "ladder") ? climbUp.call(this) : !find(current, "ladder") && find(below, "ladder") && this.data.event.climb ? climbUp.call(this) : !find(current, "ladder") && !find(above, "ladder") ? fall.call(this) : fall.call(this) : input.keys.down === !0 ? find(current, "wall") && find(current, "ladder") && find(below, "ladder") ? 
climDown.call(this) : !find(current, "ladder") && find(below, "ladder") ? climDown.call(this) : find(current, "ladder") && find(below, "ladder") ? climDown.call(this) : find(current, "ladder") && !find(below, "ladder") ? fall.call(this) : fall.call(this) : input.keys.space && fall.call(this), !1;
        },
        parseTilePosition: function() {
            var round = function(number) {
                var num = Math.round(number / 32);
                return num;
            }, speed = this.animations[this.data.action].speed, counter = this.counter, index = Math.floor(counter / speed);
            if (index > this.animations[this.data.action].frames.length - 1 || speed === 0) index = 0, this.counter = 0;
            return this.data.frameData = this.animations[this.data.action].frames[index], this.data.tileX = round(this.data.x - this.data.frameData.cpx), this.data.tileY = round(this.data.y - this.data.frameData.cpy), !1;
        },
        action: function(target, context, map) {
            
if (this.data.coolDown) return !1;
            var find = function(list, type) {
                if (list) for (var i = 0; i < list.length; i++) {
                    !list[i];
                    if (list[i].event.indexOf(type) > -1) return list[i];
                }
                return !1;
            }, collideData, data, current, below, x = this.data.tileX, y = this.data.tileY;
            return current = map.events(x, y), below = map.events(x, y + 1), find(current, "door") ? this.on.door.call(this, target, {
                x: x,
                y: y,
                door: find(current, "door"),
                map: map
            }) : find(current, "ladder") || find(below, "ladder") ? this.on.climb.call(this, target, context, map) : this.data.direction.left ? (x -= 1, collideData = map.events(x, y), data = find(collideData, "door"), data && data.event === "door" && this.on.door.call(this, target, {
                x: x,
                y: y,
                map: map
            
})) : (x += 1, collideData = map.events(x, y), data = find(collideData, "door"), data && data.event === "door" && this.on.door.call(this, target, {
                x: x,
                y: y,
                map: map
            })), !1;
        },
        moveMap: function(target) {
            return this.data.x < target.world.data.minOffset ? target.world.data.offsetX = target.world.data.minOffset : this.data.x + target.world.data.minOffset > target.world.data.maxOffsetX ? target.world.data.offsetX = target.world.data.maxOffsetX - target.world.data.minOffset : target.world.data.offsetX = this.data.x, this.data.y < target.world.data.minOffset ? target.world.data.offsetY = target.world.data.minOffset : this.data.y + target.world.data.minOffset > target.world.data.maxOffsetY ? target.world.data.offsetY = target.world.data.maxOffsetY - target.world.data.minOffset : target.world.data.offsetY = this.data.y, !1;
        },
        jump: function(target, event) {
            return !input.keys
.space || this.data.jumpRate >= 0 ? (this.data.event.jump = !1, this.data.event.fall = !0) : (this.data.moving = !0, this.data.event.jump === !1, this.data.onLand = !1, this.data.action = "jump", this.data.event.jump = !0, this.data.y += Math.floor(2 * this.data.jumpRate), this.data.jumpRate += target.world.data.gravity), !1;
        },
        fall: function(target, event) {
            return this.data.moving = !0, this.data.action = "fall", this.data.event.fall = !0, this.data.event.jump = !1, this.data.y += Math.floor(2 * this.data.fallRate), this.data.fallRate += target.world.data.gravity, !1;
        },
        land: function(target, event) {
            return this.data.action = "land", this.data.onLand = !0, this.data.event.jump = !1, this.data.event.fall = !1, this.data.event.climb = !1, this.data.fallRate = 0, this.data.jumpRate = this.data.jumpForce, !1;
        },
        animate: function(target, context, map) {
            this.data.moving = !1;
            if (this.data.travel
) return this.on.moveDoors.call(this, map), this.on.resetCollisions.call(this, context), this.on.moveMap.call(this, target, context), !1;
            if (!input.keys.left || !input.keys.right) if (input.keys.left || input.keys.right) input.keys.left && (this.data.lastDirection = "left"), input.keys.right && (this.data.lastDirection = "right"), this.data.action = "walk";
            this.data.direction.left = this.data.lastDirection === "left", this.data.direction.right = this.data.lastDirection === "right", (this.data.event.action || input.keys.up || input.keys.down) && this.data.event.climb === !1 && this.on.action.call(this, target, context, map), this.data.event.fall || !this.data.onLand && !this.data.event.climb && !this.data.event.jump ? this.on.fall.call(this, target, context) : this.data.event.climb ? this.on.climb.call(this, target, context, map) : (this.data.event.jump || input.keys.space) && this.on.jump.call(this, target, context), (this.data.event.walk || input.keys.left || 
input.keys.right) && this.on.walk.call(this, target, context), this.animations[this.data.action].speed > 0 && this.data.event.climb === !1 && this.counter++;
            var speed = this.animations[this.data.action].speed, index = Math.floor(this.counter / speed);
            if (index > this.animations[this.data.action].frames.length - 1 || speed === 0) index = 0, this.counter = 0;
            var frameData = this.data.frameData = this.animations[this.data.action].frames[index];
            return this.data.direction.left === !0 ? (this.data.isFlipped || (context.save(), context.scale(-1, 1), context.translate(-context.canvas.width, 0), this.data.isFlipped = !0), context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, context.canvas.width - map.offset(this.data.x - frameData.cpx, "X") - frameData.w, map.offset(this.data.y - frameData.cpy, "Y"), frameData.w, frameData.h)) : context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, map.offset
(this.data.x - frameData.cpx, "X"), map.offset(this.data.y - frameData.cpy, "Y"), frameData.w, frameData.h), this.on.resetCollisions.call(this, context), this.on.moveMap.call(this, target, context), !1;
        },
        collideBottom: function(target) {
            return this.data.event.fall && (this.data.y = target.y * 32 - 13, this.on.land.call(this)), this.data.onLand = !0, this.data.blocked.down = !0, !1;
        },
        collideTop: function(target) {
            return this.data.event.jump && (this.data.event.jump = !1, this.data.event.fall = !0, this.data.action = "fall"), this.data.blocked.up = !0, !1;
        },
        collideRight: function(target) {
            return this.data.action = "stand", this.data.event.walk = !1, this.data.event.stand = !0, this.data.blocked.right = !0, !1;
        },
        collideLeft: function(target) {
            return this.data.action = "stand", this.data.event.walk = !1, this.data.event.stand = !0, this.data.blocked.left = !0, !1;
        
},
        resetCollisions: function(context) {
            return this.data.action = "stand", this.data.onLand = !1, this.data.blocked.left = !1, this.data.blocked.right = !1, this.data.blocked.up = !1, this.data.blocked.down = !1, this.data.isFlipped && (context.restore(), this.data.isFlipped = !1), this.data.coolDown > 0 && this.data.coolDown--, this.data.coolDown < 0 && (this.data.coolDown = 0), this.on.parseTilePosition.call(this), !1;
        }
    };
});