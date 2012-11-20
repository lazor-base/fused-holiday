define([], function() {
    return {
        health: 100,
        x: 448,
        y: 320,
        tileX: 14,
        tileY: 10,
        w: 32,
        h: 32,
        id: "player",
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
            dash: !1,
            climb: !1,
            action: !1,
            stop: !1
        },
        lastDirection: "right",
        action: "stand",
        onLand: !1,
        blocked: {
            up: !1,
            down: !1,
            right: !1,
            left: !1
        },
        travel: !1,
        targetDoor: {
            x: 0,
            y: 0
        },
        moving: !1,
        coolDown: 0,
        jumpRate: -3,
        jumpForce: -3,
        fallRate: 0,
        walkSpeed: 1,
        frameData: null,
        isFlipped: !1,
        physics: {
            checkAgainst: [ "map", "entity"
, "bullet" ],
            types: [ "player", "entity" ]
        },
        oldFrame: {
            animation: "",
            index: 0
        }
    };
});