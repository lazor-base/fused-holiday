define(["animation","input","entity"],function(animation,input,entity){return {"characters":{"mmz":{"spriteSheet":"/client/images/mmz.png","image":null,"counter":0,"animations":{"stand":{"speed":0,"frames":[{"x":4,"y":1,"w":34,"h":39,"cpx":18,"cpy":19}]},"walk":{"speed":5,"frames":[{"x":6,"y":44,"w":30,"h":39,"cpx":18,"cpy":19},{"x":45,"y":44,"w":32,"h":38,"cpx":18,"cpy":19},{"x":86,"y":43,"w":37,"h":39,"cpx":18,"cpy":19},{"x":127,"y":44,"w":39,"h":37,"cpx":18,"cpy":19},{"x":176,"y":44,"w":32,"h":37,"cpx":18,"cpy":19},{"x":221,"y":45,"w":24,"h":36,"cpx":18,"cpy":19},{"x":261,"y":44,"w":28,"h":37,"cpx":18,"cpy":19},{"x":298,"y":43,"w":34,"h":38,"cpx":18,"cpy":19},{"x":340,"y":44,"w":34,"h":38,"cpx":18,"cpy":19},{"x":380,"y":45,"w":38,"h":37,"cpx":18,"cpy":19},{"x":424,"y":45,"w":34,"h":37,"cpx":18,"cpy":19}]},"jump":{"speed":0,"frames":[{"x":424,"y":45,"w":34,"h":37,"cpx":18,"cpy":19}]},"fall":{"speed":0,"frames":[{"x":298,"y":43,"w":34,"h":38,"cpx":18,"cpy":19}]},"land":{"speed":0,"frames":[{"x":86,"y":43,"w":37,"h":39,"cpx":18,"cpy":19}]}},"data":{"health":100,"x":50,"y":50,"w":42,"h":42,"id":"mmz","direction":{"up":false,"right":false,"down":false,"left":false},"event":{"jump":false,"fall":false,"walk":false,"dash":false},"jumpRate":-3,"jumpForce":-3,"fallRate":0,"isFlipped":false,"oldFrame":{"animation":"","index":0}},"on":{"move":function (target, event) {
if (input.keys.left || input.keys.right) {
this.data.event.walk = true;
this.data.event.stand = false;
} else {
this.data.event.walk = false;
this.data.event.stand = true;
}
if (input.keys.left && input.keys.right) {
if (this.data.direction.right === true) {
this.counter = 0;
} else if (this.data.direction.left === true) {
this.counter = 0;
}
} else if (this.data.event.walk) {
if (input.keys.right === true) {
this.data.x = this.data.x + 1;
} else if (input.keys.left === true) {
this.data.x = this.data.x - 1;
}
}
if (input.keys.right === false && this.data.direction.right === true) {
this.counter = 0;
}
if (input.keys.left === false && this.data.direction.left === true) {
this.counter = 0;
}
if (!this.data.event.jump && !this.data.event.fall) {
this.data.event.jump = false;
this.data.event.fall = false;
this.data.fallRate = 0;
this.data.jumpRate = this.data.jumpForce;
}
if (input.keys.space || this.data.event.jump || this.data.event.fall) {
if (this.data.jumpRate >= 0 || this.data.event.fall) {
event.action = "fall";
this.data.event.jump = false;
this.data.event.fall = true;
this.data.y += 2 * this.data.fallRate;
this.data.fallRate += target.world.data.gravity;
} else {
event.action = "jump";
this.data.event.jump = true;
this.data.event.fall = false;
this.data.y += 2 * this.data.jumpRate;
this.data.jumpRate += target.world.data.gravity;
if (!input.keys.space) {
this.data.event.jump = false;
this.data.event.fall = true;
}
}
}
return event;
},"walk":function (target, event) {
var collide = this.on.collision.call(this, target, event);
if (collide.triggers.indexOf("left") > -1 || collide.triggers.indexOf("right") > -1) {
event = collide.event;
}
if (input.keys.left || input.keys.right) {
this.data.event.walk = true;
this.data.event.stand = false;
} else {
this.data.event.walk = false;
this.data.event.stand = true;
}
if (input.keys.left && input.keys.right) {
if (this.data.direction.right || this.data.direction.left) {
this.counter = 0;
}
} else if (this.data.event.walk && (collide.triggers.indexOf("left") === -1 && collide.triggers.indexOf("right") === -1)) {
if (input.keys.right === true) {
this.data.x = this.data.x + 1;
} else if (input.keys.left === true) {
this.data.x = this.data.x - 1;
}
}
if (input.keys.right === false && this.data.direction.right === true) {
this.counter = 0;
}
if (input.keys.left === false && this.data.direction.left === true) {
this.counter = 0;
}
return event;
},"dash":function (target, event) {
return event;
},"stand":function (target, event) {
return event;
},"jump":function (target, event) {
event = this.on.walk.call(this, target, event);
var collide = this.on.collision.call(this, target, event);
if (collide.triggers.indexOf("top") > -1) {
this.data.event.jump = false;
event = collide.event;
this.on.fall.call(this, target, event);
} else {
this.data.fallRate = 0;
event.action = "jump";
this.data.event.jump = true;
this.data.y += Math.floor(2 * this.data.jumpRate);
this.data.jumpRate += target.world.data.gravity;
if (!input.keys.space) {
this.data.event.jump = false;
this.data.event.fall = true;
}
}
return event;
},"fall":function (target, event) {
event = this.on.walk.call(this, target, event);
var collide = this.on.collision.call(this, target, event);
if (collide.triggers.indexOf("bottom") > -1) {
this.data.event.fall = false;
event = collide.event;
this.on.land.call(this, target, event);
} else {
this.data.jumpRate = this.data.jumpForce;
event.action = "fall";
this.data.event.fall = true;
this.data.y += Math.floor(2 * this.data.fallRate);
this.data.fallRate += target.world.data.gravity;
}
return event;
},"land":function (target, event) {
this.data.event.jump = false;
this.data.event.fall = false;
this.data.fallRate = 0;
this.data.jumpRate = this.data.jumpForce;
return event;
},"crouch":function (target, event) {

},"animate":function (target, event) {
var motionType = input.getType();
this.data.direction.left = input.lastDirection === "left";
this.data.direction.right = input.lastDirection === "right";
if (this.data.event.fall) {
motionType = this.on.fall.call(this, target, motionType);
} else if (this.data.event.jump || input.keys.space) {
motionType = this.on.jump.call(this, target, motionType);
} else if (this.data.event.walk || input.keys.left || input.keys.right) {
motionType = this.on.walk.call(this, target, motionType);
}
if (this.animations[motionType.action].speed > 0) {
this.counter++;
}
var speed = this.animations[motionType.action].speed;
var counter = this.counter;
var index = Math.floor(counter / speed);
if (index > this.animations[motionType.action].frames.length - 1 || speed === 0) {
index = 0;
this.counter = 0;
}
var oldFrame = null;
if (this.data.oldFrame.animation !== "") {
oldFrame = this.animations[this.data.oldFrame.animation].frames[this.data.oldFrame.index];
}
var frameData = this.animations[motionType.action].frames[index];
if (this.data.direction.left === true) {
if (!this.data.isFlipped) {
animation.context.save();
animation.context.scale(-1, 1);
animation.context.translate(-animation.canvas.width, 0);
this.data.isFlipped = true;
}
if (oldFrame !== null) {
animation.context.clearRect(animation.canvas.width - (this.data.oldFrame.x - oldFrame.cpx) - oldFrame.w, this.data.oldFrame.y - oldFrame.cpy, oldFrame.w, oldFrame.h)
}
animation.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, animation.canvas.width - (this.data.x - frameData.cpx) - frameData.w, this.data.y - frameData.cpy, frameData.w, frameData.h);
} else {
if (this.data.isFlipped) {
animation.context.restore();
this.data.isFlipped = false;
}
if (oldFrame !== null) {
animation.context.clearRect(this.data.oldFrame.x - oldFrame.cpx, this.data.oldFrame.y - oldFrame.cpy, oldFrame.w, oldFrame.h)
}
animation.context.clearRect(this.data.x, this.data.y, this.data.w, this.data.h)
animation.context.drawImage(this.image, frameData.x, frameData.y, frameData.w, frameData.h, this.data.x - frameData.cpx, this.data.y - frameData.cpy, frameData.w, frameData.h);
}
this.data.oldFrame.index = index;
this.data.oldFrame.animation = motionType.action;
this.data.oldFrame.x = this.data.x;
this.data.oldFrame.y = this.data.y;
},"collision":function (target, event) {
var result = {
triggers: [],
event: event
};
if (this.data.x - !! (input.keys.left) <= 0) {
result.triggers.push("left");
result.event.action = "stand";
this.data.event.walk = false;
this.data.event.stand = true;
}
if (this.data.x + this.data.w + !! (input.keys.right) >= animation.canvas.width) {
result.triggers.push("right");
result.event.action = "stand";
this.data.event.walk = false;
this.data.event.stand = true;
}
if (this.data.y <= 0) {
result.triggers.push("top");
if (this.data.event.jump) {
this.data.event.jump = false;
this.data.event.fall = true;
result.event.action = "fall";
}
}
if (this.data.y + this.data.h >= animation.canvas.height) {
result.triggers.push("bottom");
if (this.data.event.fall) {
this.data.event.jump = false;
this.data.event.fall = false;
result.event.action = "land";
}
}
return result;
}}}},"tiles":{},"objects":{},"tools":{},"environment":{"world":{"spriteSheet":null,"image":null,"counter":0,"animations":{},"data":{"id":"world","gravity":0.05},"on":{}}}};});