Currently programmed tile data:
===============================

required layers (Case sensitive!)
1. event
2. foreground
3. floor
4. background

walls and inline doors go on the floor layer

background doors and ladders go on the foreground layer

background is simple background data.


The area behind the canvas will always be black.

Tile specifications:

All tiles need to include their x and y position on the tilesheet. Refer to the test map.
All tiles need to include a group; examples include "ladder", "empty", "wall", "background", "door"
All tiles need to include passability, such as "passable: false" or "passable: true".
All tiles need a unique name, in the form of "name: uniqueName"

Walls are any tile with "group: wall" specified.

Ladders are any tile with "group: ladder" specified. It is recommended to only have the middle part of the ladder climbable if you have edges to the ladder, refer to the test map for an example.

There are two types of doors, background and inline.
Inline doors cause the player to teleport through them, and are mapped with "group: door".
Background doors teleport the player to another background door of the same ID. These are also mapped with "group: door"

Programming events:

The middle tile of ladders requires an event tile with the data "event: ladder". Refer to test map for an example.

All door tiles that are usable require an event tile with the data "event: door"

All background doors require a unique event tile pair, with the data "event: doorID".
An example in the test map shows one such pair, with the data "event: doorA". The two locations of doorA can be moved between. For another pair, you would need a new event tile pair such as "event: doorB"



Work in progress:

Player spawn event tile "event: spawnPlayer"

Map end event tile "event: mapEnd", with optional "map: mapName"

Item spawn event tile "event: spawnItem" "id: itemID"

door lock via unique event tile "event: door" (or "event: doorID") "lock: keyID"