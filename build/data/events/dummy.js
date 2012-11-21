define([ "animation", "input", "map", "load" ], function(animation, input, map, load) {
    return load.ready(), {
        walk: function(target, event) {
            var collide = this.on.collision.call(this, target, event);
            if (collide.triggers.indexOf("left") > -1 || collide.triggers.indexOf("right") > -1) event = collide.event;
            return !input.keys.left && !input.keys.right && (this.data.event.walk = !1, this.data.event.stand = !0), (!input.keys.left || !input.keys.right) && this.data.event.walk && collide.triggers.indexOf("left") === -1 && collide.triggers.indexOf("right") === -1, input.keys.right === !1 && this.data.direction.right === !0, input.keys.left === !1 && this.data.direction.left === !0, event;
        },
        dash: function(target, event) {
            return event;
        },
        stand: function(target, event) {
            return event;
        },
        jump: function(target, event) {
            event = this.on.walk.call(this, target, event
);
            var collide = this.on.collision.call(this, target, event);
            return collide.triggers.indexOf("top") > -1 || this.data.jumpRate >= 0 ? (this.data.event.jump = !1, event = collide.event, this.on.fall.call(this, target, event)) : (this.data.fallRate = 0, event.action = "jump", this.data.event.jump = !0, this.data.y += Math.floor(2 * this.data.jumpRate), this.data.jumpRate += target.world.data.gravity, !input.keys.space), event;
        },
        fall: function(target, event) {
            event = this.on.walk.call(this, target, event);
            var collide = this.on.collision.call(this, target, event);
            return collide.triggers.indexOf("bottom") > -1 ? (this.data.event.fall = !1, event = collide.event, this.on.land.call(this, target, event)) : (this.data.jumpRate = this.data.jumpForce, event.action = "fall", this.data.event.fall = !0, this.data.y += Math.floor(2 * this.data.fallRate), this.data.fallRate += target.world.data.gravity), event;
        },
        
land: function(target, event) {
            return this.data.event.jump = !1, this.data.event.fall = !1, this.data.fallRate = 0, this.data.jumpRate = this.data.jumpForce, event;
        },
        crouch: function(target, event) {},
        destroy: function(target, event) {
            var oldFrame = null;
            this.data.oldFrame.animation !== "" && (oldFrame = this.animations[this.data.oldFrame.animation].frames[this.data.oldFrame.index]), this.data.direction.left === !0 ? (this.data.isFlipped || (event.context.save(), event.context.scale(-1, 1), event.context.translate(-animation.canvas.width, 0), this.data.isFlipped = !0), oldFrame !== null && event.context.clearRect(animation.canvas.width - (this.data.oldFrame.x - oldFrame.cpx) - oldFrame.w - 3, this.data.oldFrame.y - oldFrame.cpy - 3, oldFrame.w + 3, oldFrame.h + 3)) : (this.data.isFlipped && (event.context.restore(), this.data.isFlipped = !1), oldFrame !== null && event.context.clearRect(this.data.oldFrame.x - oldFrame.cpx - 3
, this.data.oldFrame.y - oldFrame.cpy - 3, oldFrame.w + 3, oldFrame.h + 3));
        },
        animate: function(target, event) {
            var motionType = {
                action: "stand",
                move: !1
            };
            this.data.event.fall ? motionType = this.on.fall.call(this, target, motionType) : this.data.event.jump ? motionType = this.on.jump.call(this, target, motionType) : this.data.event.walk && (motionType = this.on.walk.call(this, target, motionType)), this.animations[motionType.action].speed > 0 && this.counter++;
            var speed = this.animations[motionType.action].speed, counter = this.counter, index = Math.floor(counter / speed);
            if (index > this.animations[motionType.action].frames.length - 1 || speed === 0) index = 0, this.counter = 0;
            var oldFrame = null;
            this.data.oldFrame.animation !== "" && (oldFrame = this.animations[this.data.oldFrame.animation].frames[this.data.oldFrame.index]);
            var frameData = 
this.data.frameData = this.animations[motionType.action].frames[index];
            this.data.direction.left === !0 ? (this.data.isFlipped || (event.context.save(), event.context.scale(-1, 1), event.context.translate(-animation.canvas.width, 0), this.data.isFlipped = !0), event.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, animation.canvas.width - (this.data.x - frameData.cpx) - frameData.w, this.data.y - frameData.cpy, frameData.w, frameData.h)) : event.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, this.data.x - frameData.cpx, this.data.y - frameData.cpy, frameData.w, frameData.h), this.data.isFlipped && (event.context.restore(), this.data.isFlipped = !1), this.data.oldFrame.index = index, this.data.oldFrame.animation = motionType.action, this.data.oldFrame.x = this.data.x, this.data.oldFrame.y = this.data.y;
        },
        collision: function(target, event) {
            var result = {
                triggers
: [],
                event: event
            }, round = function(number) {
                var num = Math.round(number / 32) - 1;
                return num < 0 && (num = 0), num;
            }, sx = this.data.x, sy = this.data.y, ex = this.data.x + this.data.w, ey = this.data.y + this.data.h, mx = (sx + ex) / 2, my = (sy + ey) / 2, collideData = map.collide(round(sx), round(my));
            if (sx <= 0 || collideData.passable === !1) result.triggers.push("left"), result.event.action = "stand", this.data.event.walk = !1, this.data.event.stand = !0;
            collideData = map.collide(round(ex), round(my));
            if (ex >= animation.canvas.width || collideData.passable === !1) result.triggers.push("right"), result.event.action = "stand", this.data.event.walk = !1, this.data.event.stand = !0;
            collideData = map.collide(round(mx), round(sy));
            if (sy <= 0 || collideData.passable === !1) result.triggers.push("top"), this.data.event.jump && (this.data.event.jump = !1
, this.data.event.fall = !0, result.event.action = "fall");
            collideData = map.collide(round(mx), round(ey));
            if (ey >= animation.canvas.height || collideData.passable === !1) result.triggers.push("bottom"), this.data.event.fall && (this.data.event.jump = !1, this.data.event.fall = !1, result.event.action = "land");
            return result;
        }
    };
});