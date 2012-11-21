define([ "load" ], function(load) {
    return load.ready(), {
        id: "world",
        gravity: .125,
        offsetX: 160,
        offsetY: 160,
        minOffset: 224,
        maxOffsetX: 0,
        maxOffsetY: 0
    };
});