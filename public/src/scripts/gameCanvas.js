var TANK_LIST = [
  new Tank(50, 40, 180, 4, 0.5, 3, 0, 100),
  new Tank(750, 40, 0, 4, 0.5, 3, 1, 100),
  new Tank(50, 560, 180, 4, 0.5, 3, 2, 100),
  new Tank(750, 560, 0, 4, 0.5, 3, 3, 100)
];

var BARRIER_LIST = [
  new Barrier_Circle(230,150,50),
  new Barrier_Rectangle(50,100,0,100,50),
  new Barrier_Rectangle(400,100,90,200,60),
  new Barrier_Rectangle(750,100,0,100,50),
  new Barrier_Triangle(570,150,90,70),
  new Barrier_Triangle(230,450,90,70),
  new Barrier_Circle(570,450,50),
  new Barrier_Rectangle(50,500,0,100,50),
  new Barrier_Rectangle(750,500,0,100,50),
  new Barrier_Rectangle(400,500,90,200,60),
  new Barrier_Rectangle(150,300,0,180,50),
  new Barrier_Rectangle(400,300,0,180,50),
  new Barrier_Rectangle(640,300,0,180,50)


];

var matterInst = new matterObj();
matterInst.initializeMap(TANK_LIST, BARRIER_LIST);
detectCollision();
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
