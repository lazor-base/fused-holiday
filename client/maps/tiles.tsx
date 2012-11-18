<?xml version="1.0" encoding="UTF-8"?>
<tileset name="tiles" tilewidth="32" tileheight="32">
 <image source="../images/tiles.png" trans="ffffff" width="192" height="192"/>
 <tile id="0">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_left"/>
   <property name="passable" value="false"/>
   <property name="x" value="0"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_floor"/>
   <property name="passable" value="false"/>
   <property name="x" value="1"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="2">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_right"/>
   <property name="passable" value="false"/>
   <property name="x" value="2"/>
   <property name="y" value="0"/>
  </properties>
 </tile>
 <tile id="3">
  <properties>
   <property name="group" value="door"/>
   <property name="name" value="door_base"/>
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
 <tile id="6">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_floor_roof"/>
   <property name="passable" value="false"/>
   <property name="x" value="0"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="7">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_right_left"/>
   <property name="passable" value="false"/>
   <property name="x" value="1"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="8">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_roof"/>
   <property name="passable" value="false"/>
   <property name="x" value="2"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="9">
  <properties>
   <property name="group" value="empty"/>
   <property name="name" value="ladder_left"/>
   <property name="passable" value="true"/>
   <property name="x" value="3"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="10">
  <properties>
   <property name="group" value="ladder"/>
   <property name="name" value="ladder_mid"/>
   <property name="passable" value="true"/>
   <property name="x" value="4"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="11">
  <properties>
   <property name="group" value="empty"/>
   <property name="name" value="ladder_right"/>
   <property name="passable" value="true"/>
   <property name="x" value="5"/>
   <property name="y" value="1"/>
  </properties>
 </tile>
 <tile id="12">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_bottom_end"/>
   <property name="passable" value="false"/>
   <property name="x" value="0"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="13">
  <properties>
   <property name="group" value="background"/>
   <property name="name" value="background"/>
   <property name="passable" value="true"/>
   <property name="x" value="1"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="14">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall"/>
   <property name="passable" value="false"/>
   <property name="x" value="2"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="15">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_floor_left"/>
   <property name="passable" value="false"/>
   <property name="x" value="3"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="16">
  <properties>
   <property name="group" value="wall"/>
   <property name="name" value="wall_left_end"/>
   <property name="passable" value="false"/>
   <property name="x" value="4"/>
   <property name="y" value="2"/>
  </properties>
 </tile>
 <tile id="20">
  <properties>
   <property name="event" value="ladder"/>
  </properties>
 </tile>
 <tile id="21">
  <properties>
   <property name="event" value="door"/>
  </properties>
 </tile>
 <tile id="22">
  <properties>
   <property name="event" value="doorA"/>
  </properties>
 </tile>
 <tile id="23">
  <properties>
   <property name="group" value="door"/>
   <property name="name" value="background_door"/>
   <property name="passable" value="true"/>
   <property name="x" value="5"/>
   <property name="y" value="3"/>
  </properties>
 </tile>
</tileset>
