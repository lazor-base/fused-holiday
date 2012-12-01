/*global require:true, requestAnimationFrame:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
require(["animation", "input", "entity", "map", "../data/master.js"], function(animation, input, entity, map, master) {
	"use strict";
	var scores = JSON.parse(localStorage.getItem("scores")) || [];
	var lowTime = 75000;
	var highScore = 30000;
	var gameStarted = false;
	input.listen("keydown", function() {
		if (!gameStarted) {
			startGame();
		}
		input.keyDown(event, input);
	});
	input.listen("keyup", function() {
		input.keyUp(event, input);
	});
	var startDate, currentDate, timerDiv, scoreDiv, finalScoreDiv, currentTime, messageDiv;
	var randomFromTo = function(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	};
	map.buildMap("map2");
	// entity.spawn(master.characters.player, {
	// 	x: map.findPlayerSpawnX(),
	// 	y: map.findPlayerSpawnY()
	// }, animation.renderList);
	entity.spawn(master.characters.player, {
		x: 15*32,
		y: 45*32
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
	// entity.spawn(master.characters.block, {
	// 		x: 7 * 32,
	// 		y: 3 * 32
	// 	}, animation.renderList);
	var keySpawns = map.findKeySpawns();
	for (var i = 0; i < keySpawns.length; i++) {
		entity.spawn(master.objects[keySpawns[i][0]], {
			x: keySpawns[i][1] * 32,
			y: keySpawns[i][2] * 32
		}, animation.renderList);
	}
	var loadScores = function() {
		var pad = function(length, number) {
			if (number.length < length) {
				number = pad(length, "0" + number);
			}
			return number;
		};
		var frag = document.createDocumentFragment();
		if (scores.length) {
			var li = document.createElement("li");
			li.textContent = "Previous Scores";
			frag.appendChild(li);
		}
		for (var i = scores.length - 1; i > -1; i--) {
			var li = document.createElement("li");
			var milliseconds = Math.floor(scores[i] % 1000);
			var seconds = Math.floor((scores[i] / 1000) % 60);
			var minutes = Math.floor((scores[i] / (1000 * 60)) % 60);
			var hours = Math.floor((scores[i] / (1000 * 60 * 60)) % 24);
			li.textContent = ((lowTime + highScore) - scores[i]) + " / " + highScore+" - "+(pad(2, "" + hours) + ":" + pad(2, "" + minutes) + ":" + pad(2, "" + seconds) + ":" + pad(3, "" + milliseconds));
			frag.appendChild(li);
		}
		return frag;
	};
	var gameEnd = function(player, time) {
		animation.stopLoop(animation.mainLoop);
		scoreDiv.setAttribute("class", "complete");
		// TODO
		finalScoreDiv.innerText = ((lowTime + highScore) - time) + " / " + highScore;
		document.getElementById("previousScores").appendChild(loadScores());
		if (scores.indexOf(time)) {
			scores.push(time);
			localStorage.setItem("scores", JSON.stringify(scores));
		}
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
		var animationLoop = animation.animationLoop(animation, map, master, messageDiv)
		if (animationLoop) {
			gameEnd(animationLoop, currentTime);
		} else {
			return requestAnimationFrame(beginRender);
		}
	};
	var clearScores = function() {
		localStorage.setItem("scores", JSON.stringify([]));
		document.getElementById("previousScores").innerHTML = "";
	};
	var tryAgain = function() {
		window.location.reload();
	};
	var startGame = function() {
		gameStarted = true;
		document.getElementById("loading").setAttribute("class", "hidden");
		startDate = new Date();
		animation.mainLoop = beginRender();
	};
	var setup = function() {
		scoreDiv = document.getElementById("scoring");
		messageDiv = document.getElementById("message");
		timerDiv = document.getElementById("timer");
		finalScoreDiv = document.getElementById("finalScore");
		document.getElementById("clearScores").addEventListener("click", clearScores);
		document.getElementById("tryAgain").addEventListener("click", tryAgain);
		document.getElementById("startGame").addEventListener("click", startGame);
		document.getElementById("scores").appendChild(loadScores());
	};
	(function() {
		setup();
	}());
});