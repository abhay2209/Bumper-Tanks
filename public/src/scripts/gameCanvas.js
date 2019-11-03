
const CANVAS_WIDTH = 1070;
const CANVAS_HEIGHT = 800;

let canvas = document.getElementById("gameScreen");
const image = document.getElementById('tank');
const image1 = document.getElementById('bullet');

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
    this.world.gravity.x = 0;
    //this.world.gravity.y = 0;

     //initialize renderer, this acts as a middle man for canvas api
    this.render = Render.create({
      element: document.body,
      canvas: canvas,   //canvas passed into render here
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
      Bodies.rectangle(200, 100, 150, 150, { render: { sprite: { texture: './tank.png'} }})
    ]);
  }

 }

let matterInst = new matterObj;
matterInst.playSimulation();
matterInst.addBody_TEST();

/*
var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
*/
// Creates new tanks
/*let tank1 = new Tank(CANVAS_WIDTH, CANVAS_HEIGHT);

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
