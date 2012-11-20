define([ "physics", "map" ], function(physics, map) {
    return function() {
        var lastTime = 0, vendors = [ "ms", "moz", "webkit", "o" ];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(callback, element) {
            var currTime = (new Date).getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            return lastTime = currTime + timeToCall, id;
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        });
    }(), {
        canvas: {},
        context: {},
        renderList
: [],
        mainLoop: null,
        startLoop: function(fn) {
            return fn();
        },
        stopLoop: function(id) {
            return cancelAnimationFrame(id), !1;
        },
        setup: function(id) {
            return this.canvas = document.getElementById(id), this.context = this.canvas.getContext("2d"), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), !1;
        },
        animationLoop: function(map, master) {
            var length = this.renderList.length, thisEntity;
            this.setup("objects");
            for (var i = 0; i < length; i++) {
                var thisEntity = this.renderList[i];
                thisEntity.remove ? (thisEntity.on.destroy.call(thisEntity, null, null), this.renderList.splice(i), length = this.renderList.length, i--) : (physics(thisEntity, this.renderList), thisEntity.data.id === "player" ? (this.setup("player"), thisEntity.on.animate.call(thisEntity, master.environment, this.context, map), this.setup("objects"
)) : thisEntity.on.animate.call(thisEntity, master.environment, this.context, map));
            }
            return map.animate(this), !1;
        }
    };
});