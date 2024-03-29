class matterObj{
  //constructor initializes a matter-js instance, takes canvas_element as an argument which
  //is used to attach to a certain display
  constructor( canvas_element ){
    //initialize engine & world, world will be where physical objects reside in
    engineObject   = Engine.create();
    worldObject = engineObject.world;
    worldObject.gravity.y = 0

    //initialize renderer, this acts as a middle man for canvas api
    this.render = Render.create({
      element: document.body,
      canvas: canvas,   //canvas passed into render here
      engine: engineObject,
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        showVelocity: false,
        showAngleIndicator: false,
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
    detectCollision() //set callbacks when objects collide
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
    //setup status reciever or sender
    if(tank.playerNum == PLAYERNUM)
    {
      setInterval(function(){
        SOCKET.emit('tcm', PLAYERNUM, tank.body.position, tank.body.angle, tank.body.velocity, tank.body.angularVelocity, tank.body.health, tank.turrentRing.angle)
        //Body.scale(tank.healthBar,1,tank.body.health/100)
        tank.tankDeath(tank.body.health)
      }, 50)

      Events.on(engineObject, "afterUpdate", function(){
        OBJECT_CONTROLLER(tank)
        OBJECT_MOVER(tank)
      });
    }
    else{
      SOCKET.on(tank.playerNum + 'tsm', function(pPos, pAng, pVel, pAVel,pHealth, tAng){
        Body.setPosition(tank.body, pPos)
        Body.setAngle(tank.body, pAng)
        Body.setAngle(tank.turrentRing, tAng)
        Body.setVelocity(tank.body, pVel)
        Body.setAngularVelocity(tank.body, pAVel)
        tank.body.health = pHealth
        //Body.scale(this.healthBar,1,tank.health/100)
        tank.tankDeath(pHealth)
      })
    }
     
    SOCKET.on(tank.playerNum + 'ss', function(){
        tank.fire_cannon()
    })

    SOCKET.on(tank.playerNum + 'sp', function(type){
      console.log("power pick up!", type)
      if(type == 1){
        tank.bullet_power = 1
        setTimeout(function(){
          tank.bullet_power = 0
        }, 7500)
      }else if(type == 2){
        tank.health += 20
        if (tank.health > 100){
          tank.health = 100
        }
      }else if(type == 3){
        tank.maxVel = 6
        tank.accelRate = 1
        setTimeout(function(){
          tank.maxVel = 2
          tank.accelRate = 0.1
        }, 7500)
      }else if(type == 4){
        tank.bulletAmount = 3
        setTimeout(function(){
          tank.bulletAmount = 0
        }, 7500)
      }
    })

    
    //add tank to matter world
    World.add(worldObject, [tank.body, tank.turrentRing, tank.turrentConstraint, tank.healthBar,tank.healthConstraint]);
  
   }

  addBarrier(barrier){
    //add barrier to matter world
    World.add(worldObject, [barrier.body]);
  }

  spawnItems(item){
    World.add(worldObject, [item.body]);
  }

  //Initialize map from list of tanks & barriers & walls
  initializeMap(tankList, barrierList){
    //add external walls
    this.addWalls();
     //add all barriers to map
     for(var i = 0; i < barrierList.length; i++){
      this.addBarrier(barrierList[i]);
    }
    //add all tanks to map
    for(var i = 0; i < tankList.length; i++){
      this.addTank(tankList[i]);
    }
   
  }
  itemSpawnMap(itemList){
    //add items
    for(var i = 0; i < itemList.length; i++){
      this.spawnItems(itemList[i]);
    }
  }
 }
