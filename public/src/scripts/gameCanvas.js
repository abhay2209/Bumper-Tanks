
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

let canvas = document.getElementById("gameScreen");
let gameScreen = canvas.getContext('2d');
const image = document.getElementById('tank');
const image1 = document.getElementById('bullet');

// Creates new tanks
let tank1 = new Tank(CANVAS_WIDTH, CANVAS_HEIGHT);

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
}

frameRefresh(oldFrameTime);
