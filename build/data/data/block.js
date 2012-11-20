define([], function() {
    return {
        health: 100,
        x: 448,
        y: 96,
        tileX: 14,
        tileY: 3,
        w: 64,
        h: 64,
        id: "block",
        action: "idle",
        fallRate: 0,
        passable: !1,
        frameData: null,
        onLand: !1,
        moveSpeed: 1,
        direction: {
            right: !1,
            left: !1
        },
        event: {
            fall: !0,
            move: !1
        },
        moving: !1,
        blocked: {
            up: !1,
            down: !1,
            right: !1,
            left: !1
        },
        physics: {
            checkAgainst: [ "map" ],
            types: [ "entity", "block" ]
        },
        event: {
            fall: !0
        }
    };
});