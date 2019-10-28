
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

class Bullet{
  constructor(canvasWidth, canvasHeight, tank){
    this.width = 2.5
    this.height = 1.5
    //this.x = where the tank at
    //this.y = where the tank at
    this.maxSpeed = 4
    this.xSpeed = 0 //discuss for weather condition
    this.ySpeed = 0 //discuss for weather condition
    this.numOfBullet = 5
    this.normal = 0
    this.othertype1 = 0
    this.othertype2 = 0
    this.othertype3 = 0
    this.othertype4 = 0
    this.x = tank.x;
    this.y = tank.y;
  }

  fire() 
  {
    
  }
  // effect()
  // {

  // }

  draw(ctx)
  {
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }

  update(frameRate)
  {
    if(!frameRate)
      return;

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // if(this.x < 0 && this.y < 0 && this.x > 300 && this.y > 150) later 
      

    if( this.x + this.width > 300 )
      this.x = 300 - this.width;

    if( this.y + this.height > 150 )
        this.y = 150 - this.height;
  }
  
  


}


// Class to create tank objects
class Tank{
  constructor(canvasWidth, canvasHeight)
  {
    this.width = 30;
    this.height = 15;
    this.x = 0;
    this.y = 0;
    this.maxSpeed = 4;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  fire(){
    let bullet = new Bullet(canvasWidth,canvasHeight, this);
    
  }

  moveUp()
  {
    this.ySpeed = -this.maxSpeed;
  }

  moveDown()
  {
    this.ySpeed = this.maxSpeed;
  }

  moveLeft()
  {
    this.xSpeed = -this.maxSpeed;
  }

  moveRight()
  {
    this.xSpeed = this.maxSpeed;
  }

  stop()
  {
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  draw(ctx)
  {
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }

  update(frameRate)
  {
    if(!frameRate)
      return;

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.x < 0)
      this.x = 0;

    if(this.y < 0)
      this.y = 0;

    if( this.x + this.width > 300 )
      this.x = 300 - this.width;

    if( this.y + this.height > 150 )
        this.y = 150 - this.height;
  }
};

class InputHandler{
  constructor(tank){
    document.addEventListener("keydown", event => {
      switch(event.keyCode)
      {
        case 87: //W
        tank.moveUp();
        break;

        case 65: //A
          tank.moveLeft();
          break;

        case 83: //S
          tank.moveDown();
        break;

        case 68: //D
          tank.moveRight();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch(event.keyCode)
      {
        case 87: //W
        if(tank.ySpeed < 0)
          tank.stop();
          break;

        case 65: //A
        if(tank.xSpeed < 0)
          tank.stop();
        break;

        case 83: //S
        if(tank.ySpeed > 0)
          tank.stop();
          break;

        case 68: //D
        if(tank.xSpeed > 0)
          tank.stop();
        break;
      }
    });

  }
};


let canvas = document.getElementById("gameScreen");
let gameScreen = canvas.getContext('2d');
const image = document.getElementById('tank');
const image = document.getElementById('bullet');

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
