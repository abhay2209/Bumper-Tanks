class matterObj{
  //constructor initializes a matter-js instance, takes canvas_element as an argument which
  //is used to attach to a certain display
  constructor( canvas_element ){
    //initialize engine & world, world will be where physical objects reside in
    engineObject   = Engine.create();
    worldObject = engineObject.world;
    worldObject.gravity.y = 0;

    //initialize renderer, this acts as a middle man for canvas api
    this.render = Render.create({
      element: document.body,
      canvas: canvas,   //canvas passed into render here
      engine: engineObject,
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        showVelocity: true,          //travel trails
        showAngleIndicator: false,     //option to show direction of objects for testing purposes
        wireframes: false,
        background: "/src/images/grassTexture.png"
      }
    });

    //this sets where the render will look at
    Render.lookAt(this.render, {
      min: { x: 0, y: 0},
      max: { x: CANVAS_WIDTH, y: CANVAS_HEIGHT}
    });

    //initialize runner, this allows us to run the simulation
    this.runner = Runner.create();
  }

  playSimulation(){
    Render.run(this.render);
    Runner.run(this.runner, engineObject);
  }

  pauseSimulation(){
    Render.stop(this.render);
    Runner.stop(this.runner, engineObject);
  }

  //Add External Walls
  addWalls(){
    World.add(worldObject, [
      Bodies.rectangle(CANVAS_WIDTH/2, 0,               CANVAS_WIDTH, 1,              { label: 'wall',isStatic: true }),   //bottom
      Bodies.rectangle(CANVAS_WIDTH/2, CANVAS_HEIGHT,   CANVAS_WIDTH, 1,              { label: 'wall',isStatic: true }),   //top
      Bodies.rectangle(CANVAS_WIDTH,   CANVAS_HEIGHT/2, 1,            CANVAS_HEIGHT,  { label: 'wall',isStatic: true }),   //right
      Bodies.rectangle(0,              CANVAS_HEIGHT/2, 1,            CANVAS_HEIGHT,  { label: 'wall',isStatic: true })    //left
    ]);
  }

  addTank(tank){
    //add tank updater to list of things to be updated
    //console.log(tank)
    //console.log(PLAYERNUM)
    if(tank.playerNum == PLAYERNUM)
    {
      setInterval(function(){
        //console.log("client send")
        SOCKET.emit('tcm', PLAYERNUM, tank.body.position, tank.body.angle, tank.body.velocity, tank.body.angularVelocity)
      }, 50)
      Events.on(engineObject, "afterUpdate", function(){
        OBJECT_CONTROLLER(tank)
        OBJECT_MOVER(tank)
      });
    }else{
      SOCKET.on(tank.playerNum + 'tsm', function(pPos, pAng, pVel, pAVel){
        //console.log('client rec')
        Body.setPosition(tank.body, pPos)
        Body.setAngle(tank.body, pAng)
        Body.setVelocity(tank.body, pVel)
        Body.setAngularVelocity(tank.body, pAVel)
      })
    }
    
    //add tank to matter world
    World.add(worldObject, [tank.body]);
   }

  addBarrier(barrier){
    //add barrier to matter world
    World.add(worldObject, [barrier.body]);
  }

  //Initialize map from list of tanks & barriers & walls
  initializeMap(tankList, barrierList){
    //add external walls
    this.addWalls();
    //add all tanks to map
    for(var i = 0; i < tankList.length; i++){
      this.addTank(tankList[i]);
    }
    //add all barriers to map
    for(var i = 0; i < barrierList.length; i++){
      this.addBarrier(barrierList[i]);
    }
  }


 }
