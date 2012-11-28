/*global require:true, requestAnimationFrame:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
require(["animation", "input", "entity", "map", "../data/master.js", "load"], function(animation, input, entity, map, master, load) {
	"use strict";
	input.listen("keydown", function() {
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});
	var startDate, currentDate, timerDiv, scoreDiv, finalScoreDiv, currentTime;
	var randomFromTo = function(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	};
	map.buildMap("test2");
	entity.spawn(master.characters.player, {
		x: map.findPlayerSpawnX(),
		y: map.findPlayerSpawnY()
	}, animation.renderList);
	// entity.spawn(master.characters.block, {
	// 	x: randomFromTo(2, 22) * 32
	// }, animation.renderList);
	var blockSpawns = map.findBlockSpawns();
	for (var i = 0; i < blockSpawns.length; i++) {
		entity.spawn(master.characters.block, {
			x: blockSpawns[i][0] * 32,
			y: blockSpawns[i][1] * 32
		}, animation.renderList);
	}
	entity.spawn(master.characters.block, {
			x: 21 * 32,
			y: 7 * 32
		}, animation.renderList);
	var keySpawns = map.findKeySpawns();
	for (var i = 0; i < keySpawns.length; i++) {
		entity.spawn(master.objects[keySpawns[i][0]], {
			x: keySpawns[i][1] * 32,
			y: keySpawns[i][2] * 32
		}, animation.renderList);
	}
	var gameEnd = function(player, time) {
		animation.stopLoop(animation.mainLoop);
		scoreDiv.setAttribute("class","complete");
		finalScoreDiv.innerText = player.data.score*time;
	}
	var beginRender = function() {
		var pad = function(length, number) {
			if (number.length < length) {
				number = pad(length, "0" + number);
			}
			return number;
		};
		currentDate = new Date();
		currentTime = currentDate.getTime() - startDate.getTime();
		var milliseconds = Math.floor(currentTime % 1000);
		var seconds = Math.floor((currentTime / 1000) % 60);
		var minutes = Math.floor((currentTime / (1000 * 60)) % 60);
		var hours = Math.floor((currentTime / (1000 * 60 * 60)) % 24);
		timerDiv.textContent = pad(2, "" + hours) + ":" + pad(2, "" + minutes) + ":" + pad(2, "" + seconds) + ":" + pad(3, "" + milliseconds);
		var animationLoop = animation.animationLoop(animation, map, master)
		if (animationLoop) {
			gameEnd(animationLoop, currentTime);
		} else {
			return requestAnimationFrame(beginRender);
		}
	};
	var setup = function() {
		scoreDiv = document.getElementById("scoring");
		timerDiv = document.getElementById("timer");
		finalScoreDiv = document.getElementById("finalScore");
		startDate = new Date();
		animation.mainLoop = beginRender();
	};
	load.complete(setup);
	load.ready();
});