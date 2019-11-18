
var TANK_LIST = [
  new Tank(300, 300, 0, 4, 0.5, 3, 1)
];

var BARRIER_LIST = [
  new Barrier_Triangle(500, 500, 90, 50),
  new Barrier_Circle(800, 500, 100),
  new Barrier_Rectangle(40, 100, 90, 50, 100),
  new Barrier_Triangle(900, 200, 0, 25)

];
var ITEM_LIST = [
  new Items(200,200,10,10),
  new Items(800,200,10,10),
  new Items(800,600,10,10),
  new Items(200,600,10,10)
];

var matterInst = new matterObj();
matterInst.initializeMap(TANK_LIST, BARRIER_LIST);
matterInst.playSimulation();

//Commentted out until we can migrate all simulation stuff to server-side
/*var socket = io();
const image = document.getElementById('tank');

var movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  shoot: false
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
});*/
