define([ "animation", "input", "map" ], function(animation, input, map) {
    return {
        animate: function(target, event) {
            (this.data.event.fall || !this.data.onLand) && this.on.fall.call(this, target, event), this.data.event.move && this.on.move.call(this, target, event), animation.context.drawImage(this.image, this.data.frameData.x, this.data.frameData.y, this.data.frameData.w, this.data.frameData.h, this.data.x - this.data.frameData.cpx, this.data.y - this.data.frameData.cpy, this.data.w, this.data.h), this.on.resetCollisions.call(this);
        },
        move: function(target, event) {
            this.data.direction.right === !0 && this.data.blocked.right === !1 ? this.data.x = this.data.x + this.data.moveSpeed : this.data.direction.left === !0 && this.data.blocked.left === !1 && (this.data.x = this.data.x - this.data.moveSpeed);
        },
        fall: function(target, event) {
            this.data.event.fall = !0, this.data.y += Math.floor(2 * this.data.fallRate
), this.data.fallRate += target.world.data.gravity;
        },
        land: function(target, event) {
            this.data.onLand = !0, this.data.event.fall = !1, this.data.fallRate = 0;
        },
        collideBottom: function(target) {
            this.data.event.fall && (this.data.y = target.y * 32 - 32, this.on.land.call(this)), this.data.onLand = !0, this.data.blocked.down = !0;
        },
        collideTop: function(target) {
            this.data.blocked.up = !0;
        },
        collideRight: function(target) {
            this.data.event.move = !0, this.data.direction.left = !0, this.data.blocked.right = !0;
        },
        collideLeft: function(target) {
            this.data.event.move = !0, this.data.direction.right = !0, this.data.blocked.left = !0;
        },
        parseTilePosition: function() {
            var round = function(number) {
                var num = Math.round(number / 32);
                return num;
            }, speed = this.animations[this.data
.action].speed, counter = this.counter, index = Math.floor(counter / speed);
            if (index > this.animations[this.data.action].frames.length - 1 || speed === 0) index = 0, this.counter = 0;
            this.data.frameData = this.animations[this.data.action].frames[index], this.data.tileX = round(this.data.x - this.data.frameData.cpx), this.data.tileY = round(this.data.y - this.data.frameData.cpy);
        },
        resetCollisions: function() {
            this.data.action = "idle", this.data.onLand = !1, this.data.direction.left = !1, this.data.direction.right = !1, this.data.blocked.left = !1, this.data.blocked.right = !1, this.data.blocked.up = !1, this.data.blocked.down = !1, this.data.isFlipped && (animation.context.restore(), this.data.isFlipped = !1), this.on.parseTilePosition.call(this);
        }
    };
});