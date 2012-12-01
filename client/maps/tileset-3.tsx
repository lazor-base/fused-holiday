<?xml version="1.0" encoding="UTF-8"?>
<tileset name="tileset-2" tilewidth="32" tileheight="32">
 <image source="../images/tiles-2.png" width="256" height="256"/>
 <tile id="0">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value=""/>
   <property name="passable" value="false"/>
   <property name="x" value="0"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value=""/>
   <property name="passable" value="false"/>
   <property name="x" value="1"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="3">
  <properties>
   <property name="group" value="door"/>
   <property name="name" value="door_bottom"/>
   <property name="passable" value="false"/>
   <property name="x" value="3"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="4">
  <properties>
   <property name="group" value="door"/>
   <property name="name" value="door_top"/>
   <property name="passable" value="false"/>
   <property name="x" value="4"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="5">
  <properties>
   <property name="group" value="door"/>
   <property name="name" value="door_mid"/>
   <property name="passable" value="false"/>
   <property name="x" value="5"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="7">
  <properties>
   <property name="group" value="background"/>
   <property name="name" value="background_blue"/>
   <property name="passable" value="true"/>
   <property name="x" value="7"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="8">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value=""/>
   <property name="passable" value="false"/>
   <property name="x" value="0"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="9">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value=""/>
   <property name="passable" value="false"/>
   <property name="x" value="1"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="11">
  <properties>
   <property name="group" value="empty"/>
   <property name="name" value="ladder_left"/>
   <property name="passable" value="true"/>
   <property name="x" value="3"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="12">
  <properties>
   <property name="group" value="ladder"/>
   <property name="name" value="ladder_mid"/>
   <property name="passable" value="true"/>
   <property name="x" value="4"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="13">
  <properties>
   <property name="group" value="empty"/>
   <property name="name" value="ladder_right"/>
   <property name="passable" value="true"/>
   <property name="x" value="5"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="15">
  <properties>
   <property name="event" value="keySpawn"/>
   <property name="keyId" value="level3"/>
  </properties>
 </tile>
 <tile id="16">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value=""/>
   <property name="passable" value="false"/>
   <property name="x" value="0"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="17">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value=""/>
   <property name="passable" value="false"/>
   <property name="x" value="1"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="18">
  <properties>
   <property name="group" value="empty"/>
   <property name="name" value=""/>
   <property name="passable" value="true"/>
   <property name="x" value="2"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="19">
  <properties>
   <property name="group" value="empty"/>
   <property name="name" value=""/>
   <property name="passable" value="true"/>
   <property name="x" value="3"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="20">
  <properties>
   <property name="group" value="empty"/>
   <property name="name" value=""/>
   <property name="passable" value="true"/>
   <property name="x" value="4"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="21">
  <properties>
   <property name="group" value="door"/>
   <property name="name" value="background_door"/>
   <property name="passable" value="true"/>
   <property name="x" value="5"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="22">
  <properties>
   <property name="group" value="door"/>
   <property name="name" value="background_door_top"/>
   <property name="passable" value="true"/>
   <property name="x" value="6"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="23">
  <properties>
   <property name="event" value="keySpawn"/>
   <property name="keyId" value="level2"/>
  </properties>
 </tile>
 <tile id="26">
  <properties>
   <property name="event" value="ladder"/>
  </properties>
 </tile>
 <tile id="27">
  <properties>
   <property name="event" value="door"/>
  </properties>
 </tile>
 <tile id="28">
  <properties>
   <property name="event" value="doorA"/>
  </properties>
 </tile>
 <tile id="29">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_left_top_right"/>
   <property name="passable" value="false"/>
   <property name="x" value="5"/>
   <property name="y" value="3"/>
  </properties>
 </tile>
 <tile id="30">
  <properties>
   <property name="group" value="door"/>
   <property name="name" value="background_door_bottom"/>
   <property name="passable" value="true"/>
   <property name="x" value="6"/>
   <property name="y" value="3"/>
  </properties>
 </tile>
 <tile id="31">
  <properties>
   <property name="event" value="door"/>
   <property name="lock" value="level3"/>
  </properties>
 </tile>
 <tile id="34">
  <properties>
   <property name="event" value="playerSpawn"/>
  </properties>
 </tile>
 <tile id="35">
  <properties>
   <property name="event" value="mapEnd"/>
  </properties>
 </tile>
 <tile id="36">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_left_top"/>
   <property name="passable" value="false"/>
   <property name="x" value="4"/>
   <property name="y" value="4"/>
  </properties>
 </tile>
 <tile id="37">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_roof"/>
   <property name="passable" value="false"/>
   <property name="x" value="5"/>
   <property name="y" value="4"/>
  </properties>
 </tile>
 <tile id="38">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_top_right"/>
   <property name="passable" value="false"/>
   <property name="x" value="6"/>
   <property name="y" value="4"/>
  </properties>
 </tile>
 <tile id="39">
  <properties>
   <property name="event" value="door"/>
   <property name="lock" value="level2"/>
  </properties>
 </tile>
 <tile id="40">
  <properties>
   <property name="event" value="keySpawn"/>
   <property name="keyId" value="level1"/>
  </properties>
 </tile>
 <tile id="41">
  <properties>
   <property name="event" value="blockSpawn"/>
  </properties>
 </tile>
 <tile id="42">
  <properties>
   <property name="event" value="door"/>
   <property name="lock" value="level1"/>
  </properties>
 </tile>
 <tile id="43">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_bottom_left_top"/>
   <property name="passable" value="false"/>
   <property name="x" value="3"/>
   <property name="y" value="5"/>
  </properties>
 </tile>
 <tile id="44">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_left"/>
   <property name="passable" value="false"/>
   <property name="x" value="4"/>
   <property name="y" value="5"/>
  </properties>
 </tile>
 <tile id="45">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_mid"/>
   <property name="passable" value="false"/>
   <property name="x" value="5"/>
   <property name="y" value="5"/>
  </properties>
 </tile>
 <tile id="46">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_right"/>
   <property name="passable" value="false"/>
   <property name="x" value="6"/>
   <property name="y" value="5"/>
  </properties>
 </tile>
 <tile id="47">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_top_right_bottom"/>
   <property name="passable" value="false"/>
   <property name="x" value="7"/>
   <property name="y" value="5"/>
  </properties>
 </tile>
 <tile id="48">
  <properties>
   <property name="event" value="doorC"/>
  </properties>
 </tile>
 <tile id="49">
  <properties>
   <property name="event" value="doorB"/>
  </properties>
 </tile>
 <tile id="50">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_left_right"/>
   <property name="passable" value="false"/>
   <property name="x" value="2"/>
   <property name="y" value="6"/>
  </properties>
 </tile>
 <tile id="51">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_floor_roof"/>
   <property name="passable" value="false"/>
   <property name="x" value="3"/>
   <property name="y" value="6"/>
  </properties>
 </tile>
 <tile id="52">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_left_bottom"/>
   <property name="passable" value="false"/>
   <property name="x" value="4"/>
   <property name="y" value="6"/>
  </properties>
 </tile>
 <tile id="53">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_floor"/>
   <property name="passable" value="false"/>
   <property name="x" value="5"/>
   <property name="y" value="6"/>
  </properties>
 </tile>
 <tile id="54">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_bottom_right"/>
   <property name="passable" value="false"/>
   <property name="x" value="6"/>
   <property name="y" value="6"/>
  </properties>
 </tile>
 <tile id="55">
  <properties>
   <property name="event" value="doorK"/>
  </properties>
 </tile>
 <tile id="56">
  <properties>
   <property name="event" value="doorD"/>
  </properties>
 </tile>
 <tile id="57">
  <properties>
   <property name="event" value="doorE"/>
  </properties>
 </tile>
 <tile id="58">
  <properties>
   <property name="event" value="doorF"/>
  </properties>
 </tile>
 <tile id="59">
  <properties>
   <property name="event" value="doorG"/>
  </properties>
 </tile>
 <tile id="60">
  <properties>
   <property name="event" value="doorH"/>
  </properties>
 </tile>
 <tile id="61">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_left_bottom_right"/>
   <property name="passable" value="false"/>
   <property name="x" value="5"/>
   <property name="y" value="7"/>
  </properties>
 </tile>
 <tile id="62">
  <properties>
   <property name="event" value="doorI"/>
  </properties>
 </tile>
 <tile id="63">
  <properties>
   <property name="event" value="doorJ"/>
  </properties>
 </tile>
</tileset>
