//GENERAL PURPOSE FUNCTIONS
//Movement Controller
function OBJECT_CONTROLLER(obj){
  if(obj.playerNum == PLAYERNUM){
      //update speed
      if(KEY_MAP[W_KEY]){
          obj.accelerate(1);
      }else if(KEY_MAP[S_KEY]){
          obj.accelerate(0);
      }else{
          obj.deccelerate();
      }

      //update direction
      if(KEY_MAP[A_KEY]){
          obj.turnLeft();
      }else if(KEY_MAP[D_KEY]){
          obj.turnRight();
      }else{
          obj.stopTurn();
      }

      //fire cannon
    if(KEY_MAP[SPACE_KEY]){
        obj.fire_cannon();
        KEY_MAP[SPACE_KEY] = 0;
    }

      //send signals
  }else{
      //some socket.io stuff here
      //recieve signals
  }
}
//Update position of controlled objects
function OBJECT_MOVER(obj){
  if(obj.angVel != 0){
      Body.rotate(obj.body, obj.angVel);
  }
  if(obj.linVel != 0){
  Body.setVelocity(obj.body,
      { x: -Math.cos(obj.body.angle)*obj.linVel, y: -Math.sin(obj.body.angle)*obj.linVel});
  }
}


function DETECT(){
  Events.on(engineObject, 'collisionStart', function(event) {
    let pairs = event.pairs;
    pairs.forEach(function(pair) {
      if(pair.bodyA.label ==='tank' && pair.bodyB.label ==='bullet'){
        console.log("hit");
      }
      else if(pair.bodyA.label ==='bullet' && pair.bodyB.label ==='tank'){
        console.log("hit");
      }
    })
  });
}
