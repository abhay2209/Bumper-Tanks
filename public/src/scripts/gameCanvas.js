
const image = document.getElementById('tank');
const image1 = document.getElementById('bullet');

let matterInst = new matterObj;

let tank1 = new Tank(300, 300, 90);
let tank1Controls = new InputHandler(tank1);

matterInst.addWalls();
matterInst.addTank(tank1);

matterInst.playSimulation();



/*
var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
*/
// Creates new tanks


/*new InputHandler(tank1);

let oldFrameTime = 0;

function frameRefresh(newFrameTime)
{
  let frameTime = newFrameTime - oldFrameTime;
  oldFrameTime = newFrameTime;

  gameScreen.clearRect(0, 0, 800, 600); // Clears the screen every frame
  tank1.update(frameTime);
  tank1.draw(gameScreen);


  requestAnimationFrame(frameRefresh);
}

frameRefresh(oldFrameTime);*/
