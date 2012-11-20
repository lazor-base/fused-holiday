define([], function() {
    return {
        health: 100,
        x: 480,
        y: 288,
        w: 32,
        h: 32,
        id: "dummy",
        direction: {
            up: !1,
            right: !1,
            down: !1,
            left: !1
        },
        event: {
            jump: !1,
            fall: !0,
            walk: !1,
            dash: !1
        },
        frameData: null,
        jumpRate: -3,
        moving: !1,
        jumpForce: -3,
        fallRate: 0,
        isFlipped: !1,
        physics: {
            checkAgainst: [ "map" ],
            types: [ "entity" ]
        },
        oldFrame: {
            animation: "",
            index: 0
        }
    };
});