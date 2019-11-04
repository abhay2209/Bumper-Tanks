var socket = io();
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
      var newBullet = bullet;
      context.fillStyle = "yellow";
      context.fillRect(newBullet.x, newBullet.y + (newBullet.height/2) - 1.7, newBullet.width, newBullet.height);
      newBullet.x -= 8;
    }
  }
});
