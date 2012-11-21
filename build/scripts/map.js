define([ "/data/maps/test.js", "/data/maps/moarmaps.js", "animation", "/data/master.js", "load" ], function(test, moarmaps, animation, master, load) {
    return load.ready(), {
        maps: {
            test: test,
            moarmaps: moarmaps
        },
        world: master.environment.world.data,
        offsetX: -1,
        offsetY: -1,
        xList: [],
        yList: [],
        minOffset: master.environment.world.data.minOffset,
        maxOffsetX: master.environment.world.data.maxOffsetX,
        maxOffsetY: master.environment.world.data.maxOffsetY,
        currentMap: null,
        sheetImage: null,
        drawnMap: !1,
        buildMap: function(name) {
            return this.currentMap = this.maps[name], this.sheetImage = new Image, this.sheetImage.src = this.currentMap.tilesets[0].image, this.maxOffsetX = master.environment.world.data.maxOffsetX = this.currentMap.width * 32, this.maxOffsetY = master.environment.world.data.maxOffsetY = this.currentMap.width * 32, !1;
        
},
        findPlayerSpawnX: function() {
            var length = this.currentMap.layers.length, tiles = this.currentMap.tilesets[0].tileproperties, l, i, width, thisLayer, tileId, height;
            for (l = 0; l < length; l++) {
                thisLayer = this.currentMap.layers[l];
                if (thisLayer.name === "event") {
                    width = thisLayer.width, height = thisLayer.height;
                    for (var x = 0; x < width; x++) for (var y = 0; y < height; y++) {
                        tileId = thisLayer.data[width * y + x] - 1;
                        if (tileId !== -1 && tiles[tileId].event === "spawnPlayer") return x * 32;
                    }
                }
            }
            return !1;
        },
        findPlayerSpawnY: function() {
            var length = this.currentMap.layers.length, tiles = this.currentMap.tilesets[0].tileproperties, l, i, width, thisLayer, tileId, height;
            for (l = 0; l < length; l++) {
                thisLayer = 
this.currentMap.layers[l];
                if (thisLayer.name === "event") {
                    width = thisLayer.width, height = thisLayer.height;
                    for (var x = 0; x < width; x++) for (var y = 0; y < height; y++) {
                        tileId = thisLayer.data[width * y + x] - 1;
                        if (tileId !== -1 && tiles[tileId].event === "spawnPlayer") return y * 32;
                    }
                }
            }
            return !1;
        },
        animate: function(animation) {
            var thisLayer, l, x, y, tileId, width, tile, thisY, thisX, length = this.currentMap.layers.length;
            if (this.offsetX !== this.world.offsetX || this.offsetY !== this.world.offsetY) this.offsetX = this.world.offsetX, this.offsetY = this.world.offsetY, this.xList = this.roundBetween(this.offsetX - this.minOffset, this.offsetX + this.minOffset, !0), this.yList = this.roundBetween(this.offsetY - this.minOffset, this.offsetY + this.minOffset, !0), this
.drawnMap = !1;
            if (this.drawnMap === !1) {
                for (l = 0; l < length; l++) {
                    thisLayer = this.currentMap.layers[l];
                    if (thisLayer.name !== "event") {
                        animation.setup(thisLayer.name), width = thisLayer.width;
                        for (x = -1; x < this.xList.length; x++) {
                            thisX = this.xList[x + 1];
                            for (y = -1; y < this.yList.length; y++) thisY = this.yList[y + 1], typeof thisLayer.data[width * thisY + thisX] == "number" && (tileId = thisLayer.data[width * thisY + thisX] - 1, tileId !== -1 && (tile = this.currentMap.tilesets[0].tileproperties[tileId], animation.context.drawImage(this.sheetImage, this.currentMap.tileheight * tile.x, this.currentMap.tileheight * tile.y, this.currentMap.tileheight, this.currentMap.tileheight, this.currentMap.tileheight * (x + 1) - this.remainder(this.offsetX), this.currentMap.tileheight * (y + 1) - this.remainder
(this.offsetY), this.currentMap.tileheight, this.currentMap.tileheight)));
                        }
                    }
                }
                this.drawnMap = !0;
            }
            return !1;
        },
        remainder: function(number) {
            return number % 32;
        },
        offset: function(number, position) {
            return number - (this["offset" + position] - this.minOffset);
        },
        roundBetween: function(start, end, map) {
            var round = function(number) {
                var num = Math.floor(number / 32);
                return num < 0 && (num = 0), num;
            };
            if (start % 32 === 0 && !map) return [ round(start) ];
            var roundedStart = round(start), roundedEnd = round(end), numbers = [];
            for (var i = roundedStart; i < roundedEnd; i++) numbers.push(i);
            return numbers.push(roundedEnd), numbers;
        },
        tileList0: [],
        tileList1: [],
        tileList2
: [],
        tileList3: [],
        tileListIndex: 0,
        getTiles: function(xList, yList) {
            var index = this.tileListIndex, results = this["tileList" + index];
            results.length && (results.length = 0);
            var length = this.currentMap.layers.length;
            for (l = 0; l < length; l++) {
                var thisLayer = this.currentMap.layers[l], width = thisLayer.width;
                for (var x = 0; x < xList.length; x++) {
                    var thisX = xList[x];
                    for (var y = 0; y < yList.length; y++) {
                        var thisY = yList[y], tileId = thisLayer.data[width * thisY + thisX] - 1, tiles = this.currentMap.tilesets[0].tileproperties;
                        tileId === -1 ? results.push(!1) : results.push(tiles[tileId].passable === "false");
                    }
                }
            }
            return this.tileListIndex++, this.tileListIndex > 3 && (this.tileListIndex = 0), results;
        },
        
eventDataList0: [],
        eventDataList1: [],
        eventDataList2: [],
        eventDataListIndex: 0,
        events: function(x, y) {
            var index = this.eventDataListIndex, results = this["eventDataList" + index], tiles = this.currentMap.tilesets[0].tileproperties, length = this.currentMap.layers.length, thisLayer, width, tileId, l;
            results.length && (results.length = 0);
            for (l = 0; l < length; l++) thisLayer = this.currentMap.layers[l], thisLayer.name === "event" && (width = thisLayer.width, tileId = thisLayer.data[width * y + x] - 1, tileId !== -1 && (results[index] ? results[index] = tiles[tileId] : results.push(tiles[tileId])));
            return this.eventDataListIndex++, this.eventDataListIndex > 2 && (this.eventDataListIndex = 0), results;
        },
        removeDoor: function(x, y) {
            var length = this.currentMap.layers.length, tiles = this.currentMap.tilesets[0].tileproperties, l, i, width, thisLayer, tileId;
            for (
l = 0; l < length; l++) {
                thisLayer = this.currentMap.layers[l];
                if (thisLayer.name === "event" || thisLayer.name === "floor") {
                    width = thisLayer.width;
                    for (i = y - 1; i < y + 2; i++) tileId = thisLayer.data[width * i + x] - 1, tileId !== -1 && (tiles[tileId].group === "door" || tiles[tileId].event && tiles[tileId].event.indexOf("door") > -1) && (thisLayer.data[width * i + x] = 0, this.drawnMap = !1);
                }
            }
            return !1;
        },
        xy: {
            x: 0,
            y: 0
        },
        matchDoor: function(originX, originY) {
            var thisLayer, l, x, y, tileId, width, height, tile, searchTile, xy;
            xy = this.xy;
            var length = this.currentMap.layers.length;
            for (l = 0; l < length; l++) {
                thisLayer = this.currentMap.layers[l];
                if (thisLayer.name === "event") {
                    width = thisLayer
.width, height = thisLayer.height, searchTile = thisLayer.data[width * originY + originX] - 1;
                    for (y = 0; y < height; y++) for (x = 0; x < width; x++) {
                        tileId = thisLayer.data[width * y + x] - 1;
                        if (tileId !== -1 && tileId === searchTile && (originX !== x || originY !== y)) return xy.x = x, xy.y = y, xy;
                    }
                }
            }
            return xy.x = originX, xy.y = originY, xy;
        }
    };
});