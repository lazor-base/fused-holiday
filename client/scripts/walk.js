define([], function() {
	var canvas = document.getElementById('canvas');
	// get our canvas tag in the DOM
	var ctx = canvas.getContext('2d');
	// set the context of the canvas
	var character = new Image();
	// create a new image object for our sprite sheet
	var player = { // create our player object
		x: 0,
		// set the player’s x position
		y: 50,
		// set the player’s y position
		w: 42,
		// set the player’s width
		h: 42,
		// set the player’s height
		sx: 0,
		// set the player’s image’s source x position
		sy: 0,
		// set the player’s image’s source y position
		faceRight: true,
		// this will tell the code our player is facing right to start
		faceLeft: false,
		// this is set to false so our player will face right
		counter: 0,
		// counter we use to know when to change frames
		step: 5,
		// we change frames every 15 frames, so increase or decrease this number if you want the player to walk faster or slower
		nextStep: 0,
		// this increases with each frame change
		endStep: 55,
		// when counter equals this number, everything resets and we go back to the first frame
		start: { // sets the start postions of our source
			rightX: 0,
			// start x position when facing right
			leftX: 42,
			// start x position when facing left
			y: 0 // start y position is the same for both
		}
	};
	var key = { // the variables we’ll use to see if a key is being pressed
		right: false,
		left: false
	};

	var move = function(yPos, right, left) {
		player.faceRight = right;
		player.faceLeft = left;
		if (player.counter === player.endStep) {
			player.sx = 0;
			player.counter = 0;
			player.nextStep = player.step;
		} else if (player.counter === player.nextStep) {
			if (player.sy === player.start.y) {
				player.sx = 0;
			} else if (player.sy === yPos) {
				player.sx += player.w;
			}
			player.sy = yPos;
			player.nextStep += player.step;
		}
		player.counter += 1;
	}

	var reset = function() {
		player.sy = player.start.y;
		player.counter = 0;
		player.nextStep = 0;
	}

	var drawPlayer = function() {
		if (key.left && key.right) {
			if (player.faceRight === true) {
				player.sx = player.start.rightX;
				reset();
			} else if (player.faceLeft === true) {
				player.sx = player.start.leftX;
				reset();
			}
		} else {
			if (key.right === true) {
				move(42, true, false);
				player.x += 1;
				if (player.x > canvas.width + player.w + 1) {
					player.x = -player.w;
				}
			} else if (key.left === true) {
				move(84, false, true);
				player.x -= 1;
				if (player.x < -player.w - 1) {
					player.x = canvas.width + player.w;
				}
			}
		}
		if (key.right === false && player.faceRight === true) {
			player.sx = player.start.rightX;
			reset();
		}
		if (key.left === false && player.faceLeft === true) {
			player.sx = player.start.leftX;
			reset();
		}
		// console.log(key.left, key.right, player.sx, player.sy, player.w, player.h, player.x, player.y)
		ctx.drawImage(character, player.sx, player.sy, player.w, player.h, player.x, player.y, player.w, player.h);
	}

	var keyDown = function(e) {
		if (e.keyCode === 39) {
			key.right = true;
		} else if (e.keyCode === 37) {
			key.left = true;
		} else if (e.keyCode === 32) {
			key.jump = true;
		}
	}

	var keyUp = function(e) {
		console.log(e.keyCode)
		if (e.keyCode === 39) {
			key.right = false;
		} else if (e.keyCode === 37) {
			key.left = false;
		} else if (e.keyCode === 32) {
			key.jump = false;
		}
	}

	var drawBG = function() {
		ctx.fillStyle = '#00f';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#0f0';
		ctx.fillRect(0, 185, canvas.width, 15);
	}

	var clearCanvas = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	var loop = function() {
		//clearCanvas();
		drawBG();
		drawPlayer();
		requestAnimationFrame(loop);
	}

	var init = function() {
		character.src = '/client/images/mmz.png';
		window.addEventListener('keydown', keyDown, false);
		window.addEventListener('keyup', keyUp, false);
		loop();
	}

	return init;
});