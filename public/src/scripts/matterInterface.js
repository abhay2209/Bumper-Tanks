const CANVAS_WIDTH = 1070;
const CANVAS_HEIGHT = 800;

let canvas = document.getElementById("gameScreen");

//Matter-js interfaces set here
const Engine = Matter.Engine;  //engine interface
const Render = Matter.Render;  //render interface
const Runner = Matter.Runner;  //runner interface
const World = Matter.World;    //world interface
const Bodies = Matter.Bodies;  //bodies interface
const Body = Matter.Body;
const Events = Matter.Events;  //events interface
//End of Matter-js interfaces

 class matterObj{
  //constructor initializes a matter-js instance, takes canvas_element as an argument which
  //is used to attach to a certain display
  constructor( canvas_element ){
    //initialize engine & world, world will be where physical objects reside in
    this.engine = Engine.create();
    this.world = this.engine.world;
    this.world.gravity.x = 0;
    this.world.gravity.y = 0;

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

  addTank(tank){
    //updates position of tank if we have user input
    Events.on(this.engine, "afterUpdate", function(){
      tank.update();
    });

    var tankBody = Bodies.rectangle(tank.x, tank.y, tank.width, tank.height, { frictionAir: 0.2 });

    World.add(this.world, [
      tankBody
    ]);

    Body.rotate(tankBody, tank.a); //set initial rotation //

    tank.body = tankBody; //control tank through this
   }

   //addBullet(tank){
    //var firedBullet = Bodies.circle(/*x in front of tank*/, /*y in front of tank*/, /*size of bullet*/, { frictionAir:0.01 });

    //World.add(this.world, [
    //  firedBullet
    //]);

    //return firedBullet;
   //}

   //This function adds walls just outside of view
  addWalls(){
    World.add(this.world, [
      Bodies.rectangle(CANVAS_WIDTH/2, 0,               CANVAS_WIDTH, 1,              { isStatic: true }),   //bottom
      Bodies.rectangle(CANVAS_WIDTH/2, CANVAS_HEIGHT,   CANVAS_WIDTH, 1,              { isStatic: true }),   //top
      Bodies.rectangle(CANVAS_WIDTH,   CANVAS_HEIGHT/2, 1,            CANVAS_HEIGHT,  { isStatic: true }),   //right
      Bodies.rectangle(0,              CANVAS_HEIGHT/2, 1,            CANVAS_HEIGHT,  { isStatic: true })    //left
    ]);
  }

 }

