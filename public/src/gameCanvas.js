
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

//Matter-js interfaces set here
const Engine = Matter.Engine;  //engine interface
const Render = Matter.Render;  //render interface
const Runner = Matter.Runner;  //runner interface
const World = Matter.World;    //world interface
const Bodies = Matter.Bodies   //bodies interface
/*Keyboard Control Inerface could go here*/
//End of Matter-js interfaces

class matterObj{
  //constructor initializes a matter-js instance, takes canvas_element as an argument which
  //is used to attach to a certain display
  constructor( canvas_element ){
    //initialize engine & world, world will be where physical objects reside in
    this.engine = Engine.create();
    this.world = this.engine.world;

    //initialize renderer, this acts as a middle man for canvas api
    this.render = Render.create({
      element: document.body,
      canvas: canvas_element,   //canvas passed into render here
      engine: this.engine,
      options: {
        width: CANVAS_WIDTH,
        width: CANVAS_HEIGHT,
        showVelocity: true,          //travel trails
        showAngleIndicator: true     //option to show direction of objects for testing purposes
      }
    });

    //this sets wher the render will look at
    Render.lookAt(this.render, {
      min: { x: 0, y: 0},
      max: { x: CANVAS_WIDTH, y: CANVAS_HEIGHT}
    });

    //initialize runner, this allows us to run the simulation
    this.runner = Runner.create();
  }

  playSimulation(){
    Render.run(this.render);
    Runner.run(this.runner, this.engine);
  }

  pauseSimulation(){
    Render.run(this.render);
    Runner.run(this.runner, this.engine);
  }

  //This polymorphic function will be where we spawn tanks, obstacles & bullets
  addBody(){

  }

  //This function adds walls just outside of view
  addWalls(){
    World.add(this.world, [
      Bodies.rectangle(CANVAS_WIDTH/2, 0,               CANVAS_WIDTH, 1,              { isStatic: true }),   //bottom
      Bodies.rectangle(CANVAS_WIDTH/2, CANVAS_HEIGHT,   CANVAS_WIDTH, 1,              { isStatic: true }),   //top
      Bodies.rectangle(CANVAS_WIDTH,   CANVAS_HEIGHT/2, 1,            CANVAS_HEIGHT,  { isStatic: true }),   //right
      Bodies.rectangle(0,              CANVAS_HEIGHT/2, 1,            CANVAS_HEIGHT,  { isStatic: true })    //left
    ]);
  }

  //For testing purposes
  addBody_TEST(){
    this.addWalls();
    World.add(this.world, [
      Bodies.rectangle(200, 100, 60, 60)
    ]);
  }

}

//Polymorphic Super class responsible for keeping track of an object's variables
//TODO: make tank, obstacle & bullet a subclass of this class
class OBJECT{
  constructor(canvasWidth, canvasHeight, xPos, yPos, xSpeed, ySpeed, angle, shape, width, height, weight){
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.angle = angle;
    this.shape = shape;
    this.width = width;
    this.height = height;
    this.weight = weight;
  }

  draw(ctx){
    ctx.drawImage(image, this.xPos, this.yPos, this.width, this.height);
  }

  update(frameRate){
    if(!frameRate){
      return;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.x < 0)  //left border checking
      this.x = 0;

    if(this.y < 0)  //bottom border checking
      this.y = 0;

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

/*var Engine = Matter.Engine;
let canvas = document.getElementById("gameScreen");
let gameScreen = canvas.getContext('2d');
const image = document.getElementById('tank');

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

frameRefresh(oldFrameTime);*/

let canvas = document.getElementById("gameScreen");
//let gameScreen = canvas.getContext('2d');
let matterInstance = new matterObj(canvas);
matterInstance.playSimulation();
matterInstance.addBody_TEST();

