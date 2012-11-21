define([ "load" ], function(load) {
    return load.ready(), {
        stand: {
            speed: 0,
            frames: [ {
                x: 4,
                y: 1,
                w: 34,
                h: 39,
                cpx: 18,
                cpy: 19
            } ]
        },
        climb: {
            speed: 0,
            frames: [ {
                x: 4,
                y: 1,
                w: 34,
                h: 39,
                cpx: 18,
                cpy: 19
            } ]
        },
        walk: {
            speed: 5,
            frames: [ {
                x: 6,
                y: 44,
                w: 30,
                h: 39,
                cpx: 18,
                cpy: 19
            }, {
                x: 45,
                y: 44,
                w: 32,
                h: 38,
                cpx: 18,
                cpy: 19
            }, {
                x: 86,
                y: 43,
                w: 37,
                h: 39,
                
cpx: 18,
                cpy: 19
            }, {
                x: 127,
                y: 44,
                w: 39,
                h: 37,
                cpx: 18,
                cpy: 19
            }, {
                x: 176,
                y: 44,
                w: 32,
                h: 37,
                cpx: 18,
                cpy: 19
            }, {
                x: 221,
                y: 45,
                w: 24,
                h: 36,
                cpx: 18,
                cpy: 19
            }, {
                x: 261,
                y: 44,
                w: 28,
                h: 37,
                cpx: 18,
                cpy: 19
            }, {
                x: 298,
                y: 43,
                w: 34,
                h: 38,
                cpx: 18,
                cpy: 19
            }, {
                x: 340,
                y: 44,
                w: 34,
                h: 38,
                cpx: 18,
                cpy: 19
            }, 
{
                x: 380,
                y: 45,
                w: 38,
                h: 37,
                cpx: 18,
                cpy: 19
            }, {
                x: 424,
                y: 45,
                w: 34,
                h: 37,
                cpx: 18,
                cpy: 19
            } ]
        },
        jump: {
            speed: 0,
            frames: [ {
                x: 424,
                y: 45,
                w: 34,
                h: 37,
                cpx: 18,
                cpy: 19
            } ]
        },
        fall: {
            speed: 0,
            frames: [ {
                x: 298,
                y: 43,
                w: 34,
                h: 38,
                cpx: 18,
                cpy: 19
            } ]
        },
        land: {
            speed: 0,
            frames: [ {
                x: 86,
                y: 43,
                w: 37,
                h: 39,
                cpx: 18,
                cpy: 19
            
} ]
        }
    };
});