//import { Socket } from "dgram";

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
    if(KEY_MAP[J_KEY]){
        SOCKET.emit('tank client shoot', PLAYERNUM)
        obj.fire_cannon();
        KEY_MAP[J_KEY] = 0;
    }

    SOCKET.emit('tank client move', obj.body.position, obj.body.angle, PLAYERNUM)
  }
  else
  {
    SOCKET.on('tank server move', function(inc_position, inc_angle, inc_player_num){
      if(obj.playerNum == inc_player_num)
      {
        obj.body.position = inc_position
        obj.body.angle = inc_angle
      }
    })

    SOCKET.on('tank server shoot', function(inc_player_num){
      if(obj.playerNum == inc_player_num)
      {
        obj.fire_cannon();
      }
    })
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

//function to detect collision
function detectCollision(){
  Events.on(engineObject, 'collisionStart', function(event) {
    let pairs = event.pairs;
    pairs.forEach(function(pair) {
      if(pair.bodyA.label ==='tank' && pair.bodyB.label ==='bullet'){
        World.remove(worldObject,pair.bodyB);
        pair.bodyA.parent.health -= pair.bodyB.damage;
        console.log(pair.bodyA.parent.health);
      }
      else if(pair.bodyA.label ==='bullet' && pair.bodyB.label ==='tank'){
        World.remove(worldObject,pair.bodyA);
        pair.bodyB.parent.health -= pair.bodyA.damage;
        console.log(pair.bodyA.parent.health);

      }else if(pair.bodyA.label ==='bullet' && pair.bodyB.label ==='barrier'){
        World.remove(worldObject,pair.bodyA);
      }else if(pair.bodyA.label ==='barrier' && pair.bodyB.label ==='bullet'){
        World.remove(worldObject,pair.bodyB);
      }else if(pair.bodyA.label ==='wall' && pair.bodyB.label ==='bullet'){
        World.remove(worldObject,pair.bodyB);
      }
    })
  });
}
