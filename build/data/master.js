define([ "entity", "/data/data/world.js", "/data/animations/playertest.js", "/data/data/player.js", "/data/events/player.js", "/data/animations/dummy.js", "/data/data/dummy.js", "/data/events/dummy.js", "/data/animations/block.js", "/data/data/block.js", "/data/events/block.js", "load" ], function(entity, world, playerAnimation, playerData, playerEvents, dummyanimation, dummydata, dummyevents, blockAnimation, blockData, blockEvents, load) {
    load.ready();
    var master = {
        characters: {},
        tiles: {},
        objects: {},
        tools: {},
        environment: {}
    };
    return entity.make(master, "/images/tiles.png", "characters", blockAnimation, blockData, blockEvents), entity.make(master, "/images/playertest.png", "characters", playerAnimation, playerData, playerEvents), entity.make(master, "/images/mmz.png", "characters", dummyanimation, dummydata, dummyevents), entity.make(master, null, "environment", null, world, null), master;
});