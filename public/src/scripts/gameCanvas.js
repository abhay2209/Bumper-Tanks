<<<<<<< HEAD
var socket = io();
const image = document.getElementById('tank');

var movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  shoot: false
=======

// const CANVAS_WIDTH = 800;
// const CANVAS_HEIGHT = 600;

let canvas = document.getElementById("gameScreen");
let gameScreen = canvas.getContext('2d');
const image = document.getElementById('tank');
const image1 = document.getElementById('bullet');
/*
var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
*/
// Creates new tanks
let tank1 = new Tank(CANVAS_WIDTH, CANVAS_HEIGHT);

// var bullets = [];

new InputHandler(tank1);

let oldFrameTime = 0;

function frameRefresh(newFrameTime)
{
  let frameTime = newFrameTime - oldFrameTime;
  oldFrameTime = newFrameTime;

  gameScreen.clearRect(0, 0, 800, 600); // Clears the screen every frame
  tank1.update(frameTime);
  tank1.draw(gameScreen);
  requestAnimationFrame(frameRefresh);
>>>>>>> 6e35a556dc4c43bcbec38b225f7bf3cbeeb6fc9b
}

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('gameScreen');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players, bullet) {
  context.clearRect(0, 0, 800, 600);
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.drawImage(image, player.x, player.y, player.width, player.height);
    if(movement.shoot)
    {
      context.fillStyle = "yellow";
      context.fillRect(bullet.x, bullet.y + (bullet.height/2) - 1.7, bullet.width, bullet.height);
    }
  }
});
