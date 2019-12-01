//GENERAL PURPOSE FUNCTIONS
//Movement Controller
var powerSize_trigger = 0;
var health_trigger = 0;
var speed_trigger = 0;
var poison_trigger = 0;
var bullets_trigger = 0;
var time = 0;

function OBJECT_CONTROLLER(obj){
  if(obj.playerNum == PLAYERNUM){
      //update speed
      if(KEY_MAP[W_KEY]){
          if(speed_trigger == 1)
          {
            obj.accelRate = 1;
            obj.maxVel = 8;
            setTimeout(changeSpeed, 10000);
          }
          else
          {
            obj.accelRate = 0.5;
            obj.maxVel = 4;
          }
          obj.accelerate(1);
      }else if(KEY_MAP[S_KEY]){
        if(speed_trigger == 1)
        {
          obj.accelRate = 1;
          obj.maxVel = 8;
          setTimeout(changeSpeed, 10000);
        }
        else
        {
          obj.accelRate = 0.5;
          obj.maxVel = 4;
        }
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
        if(powerSize_trigger == 1)
        {
          obj.bullet_power = 1;
          setTimeout(changePower, 3000);
        }
        else{
          obj.bullet_power = 0;
        }
        if(bullets_trigger == 1)
        {
          obj.bulletAmount = 3;
          setTimeout(changeBullets, 3000);
        }
        else{
          obj.bulletAmount = 0;
        }
        obj.fire_cannon();
        KEY_MAP[J_KEY] = 0;
    }

      //send signals
  }else{
      //some socket.io stuff here
      //recieve signals
  }
}
function changePower(){
  powerSize_trigger = 0;
}

function changeBullets(){
  bullets_trigger = 0;
}

function changeSpeed(){
  speed_trigger = 0;
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
        World.remove(worldObject, pair.bodyB);
        pair.bodyA.parent.health -= pair.bodyB.damage;
        console.log(pair.bodyA.parent.health);
      }
      else if(pair.bodyA.label ==='bullet' && pair.bodyB.label ==='tank'){

        World.remove(worldObject, pair.bodyA);
        pair.bodyB.parent.health -= pair.bodyA.damage;
        console.log(pair.bodyA.parent.health);

      }else if(pair.bodyA.label ==='bullet' && pair.bodyB.label ==='barrier'){
        World.remove(worldObject, pair.bodyA);
      }else if(pair.bodyA.label ==='barrier' && pair.bodyB.label ==='bullet'){
        World.remove(worldObject, pair.bodyB);
      }else if(pair.bodyA.label ==='wall' && pair.bodyB.label ==='bullet'){
        World.remove(worldObject, pair.bodyB);

      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='powerSize'){
        World.remove(worldObject, pair.bodyB);
        powerSize_trigger = 1;

        // pair.bodyA.parent.bullet_damage *= 2;
        // pair.bodyA.parent.bullet_size *= 6;

      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='health'){
        World.remove(worldObject,pair.bodyB);
        pair.bodyA.parent.health +=20;
        if(pair.bodyA.parent.health>100){
            pair.bodyA.parent.health=100;
         }
      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='poison'){
        pair.bodyA.parent.health -= pair.bodyB.damage;

        //TODO
        //if health reached out less than 0, destroy
        // if(pair.bodyB.parent.health <= 0){
        //   //destroy objects
        // }

        World.remove(worldObject, pair.bodyB);
      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='speed'){
        speed_trigger = 1;
        //TODO
        //speed up by 30% temporarily
        //should build temprorary speed up (maybe using time interval?)
        World.remove(worldObject, pair.bodyB);
      }else if(pair.bodyA.label ==='tank'&& pair.bodyB.label ==='moreBullets'){
        bullets_trigger = 1;
        World.remove(worldObject, pair.bodyB);
    };
  });
});
}
