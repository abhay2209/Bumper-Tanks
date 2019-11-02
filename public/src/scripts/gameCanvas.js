var socket = io();

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('gameScreen');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  console.log(players);
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});

/*
var socket = io();
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

let canvas = document.getElementById("gameScreen");
let context = canvas.getContext('2d');
// const image = document.getElementById('tank');
// const image1 = document.getElementById('bullet');

socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});

// Creates new tanks
// let tank1 = new Tank(CANVAS_WIDTH, CANVAS_HEIGHT);

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});


socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

/*
let oldFrameTime = 0;

function frameRefresh(newFrameTime)
{
  let frameTime = newFrameTime - oldFrameTime;
  oldFrameTime = newFrameTime;

  gameScreen.clearRect(0, 0, 800, 600); // Clears the screen every frame
  tank1.update(frameTime);
  tank1.draw(context);


  requestAnimationFrame(frameRefresh);
}

frameRefresh(oldFrameTime);
*/
