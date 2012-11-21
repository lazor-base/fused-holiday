define([ "load" ], function(load) {
    return load.ready(), {
        keys: {
            up: !1,
            down: !1,
            right: !1,
            left: !1,
            space: !1,
            z: !1,
            x: !1
        },
        listen: function(name, fn) {
            return document.addEventListener(name, fn), !1;
        },
        trigger: function(name, details) {
            var event = new CustomEvent(name, {
                detail: details
            });
            return document.dispatchEvent(event), !1;
        },
        keyDown: function(event, input) {
            return event.keyCode === 39 && (this.keys.right = !0), event.keyCode === 37 && (this.keys.left = !0), event.keyCode === 32 && (this.keys.space = !0), event.keyCode === 38 && (this.keys.up = !0), event.keyCode === 40 && (this.keys.down = !0), event.keyCode === 90 && (this.keys.z = !0), event.keyCode === 88 && (this.keys.x = !0), !1;
        },
        keyUp: function(event, input) {
            return event
.keyCode === 39 && (this.keys.right = !1), event.keyCode === 37 && (this.keys.left = !1), event.keyCode === 32 && (this.keys.space = !1), event.keyCode === 38 && (this.keys.up = !1), event.keyCode === 40 && (this.keys.down = !1), event.keyCode === 90 && (this.keys.z = !1), event.keyCode === 88 && (this.keys.x = !1), !1;
        }
    };
});