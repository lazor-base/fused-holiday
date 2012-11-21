define([ "load" ], function(load) {
    return load.ready(), {
        idle: {
            speed: 0,
            frames: [ {
                x: 0,
                y: 96,
                w: 64,
                h: 64,
                cpx: 32,
                cpy: 32
            } ]
        }
    };
});