//GENERAL PURPOSE FUNCTIONS
//Movement Controller
var time = 0;
function OBJECT_CONTROLLER(obj){
  if(KEY_MAP[W_KEY]){
    obj.accelerate(1);
  }else if(KEY_MAP[S_KEY]){
      obj.accelerate(0);
  }else{
      obj.deccelerate();
  }

  if(KEY_MAP[A_KEY])      
    obj.turnLeft()
  else if(KEY_MAP[D_KEY]) 
    obj.turnRight()
  else                          
    obj.stopTurn()

  if(KEY_MAP[H_KEY])      
    obj.turrentLeft()
  else if(KEY_MAP[K_KEY]) 
    obj.turrentRight()
  else                          
    obj.stopTurrent()

  if(KEY_MAP[J_KEY])
  {
    KEY_MAP[J_KEY] = 0
    SOCKET.emit('cs', obj.playerNum)
  }
}

//Update position of controlled objects
function OBJECT_MOVER(obj){
  if(obj.angVel != 0){
      Body.rotate(obj.body, obj.angVel);
      Body.rotate(obj.turrentRing, obj.angVel)
  }
  if(obj.angVel2 != 0){
    Body.rotate(obj.turrentRing, obj.angVel2);
}
  if(obj.linVel != 0){
  Body.setVelocity(obj.body,
      { x: -Math.cos(obj.body.angle)*obj.linVel, y: -Math.sin(obj.body.angle)*obj.linVel});
  }
}

function respawnPowerup(xPos){
  var newItem = new Items(xPos, 300, 90, 20, 20);
  World.add(worldObject, [newItem.body]);
}
//function to detect collision
function detectCollision(){
  Events.on(engineObject, 'collisionStart', function(event) {
    let pairs = event.pairs;
    pairs.forEach(function(pair) {
      if(pair.bodyA.label ==='tank' && pair.bodyB.label ==='bullet'){
        World.remove(worldObject, pair.bodyB);
        pair.bodyA.parent.health -= pair.bodyB.damage;
        console.log(pair.bodyA.parent.health);
      }
      else if(pair.bodyA.label ==='bullet' && pair.bodyB.label ==='tank'){

        World.remove(worldObject, pair.bodyA);
        pair.bodyB.parent.health -= pair.bodyA.damage;
        console.log(pair.bodyA.parent.health);

      }else if(pair.bodyA.label ==='bullet' && pair.bodyB.label ==='barrier'){
        setTimeout(function(){World.remove(worldObject, pair.bodyB)}, 1000)
      }else if(pair.bodyA.label ==='barrier' && pair.bodyB.label ==='bullet'){
        setTimeout(function(){World.remove(worldObject, pair.bodyB)}, 1000)
      }else if(pair.bodyA.label ==='wall' && pair.bodyB.label ==='bullet'){
        setTimeout(function(){World.remove(worldObject, pair.bodyB)}, 1000)

      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='powerSize'){
        var newX = pair.bodyB.x;
        World.remove(worldObject, pair.bodyB);
        //setTimeout(respawnPowerup, 5000, newX);

        if(PLAYERNUM == pair.bodyA.parent.pNum)
          SOCKET.emit('cp', 1, PLAYERNUM)

      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='health'){
        var newX = pair.bodyB.x;
        World.remove(worldObject, pair.bodyB);
        //setTimeout(respawnPowerup, 5000, newX);

        if(PLAYERNUM == pair.bodyA.parent.pNum)
          SOCKET.emit('cp', 2, PLAYERNUM)

      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='speed'){
        var newX = pair.bodyB.x;
        World.remove(worldObject, pair.bodyB);
        //setTimeout(respawnPowerup, 5000, newX);

        if(PLAYERNUM == pair.bodyA.parent.pNum)
          SOCKET.emit('cp', 3, PLAYERNUM)

      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='moreBullets'){
        var newX = pair.bodyB.x;
        World.remove(worldObject, pair.bodyB);
        //setTimeout(respawnPowerup, 5000, newX);

        if(PLAYERNUM == pair.bodyA.parent.pNum)
          SOCKET.emit('cp', 4, PLAYERNUM)
      }
      else if(pair.bodyA.label ==='bar' && pair.bodyB.label === 'barrier' ){
        pair.isActive=false;
      }
      else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='bar'){
        pair.isActive=false;
      }
      
    })
  })
}
