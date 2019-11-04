// Class to create tank objects
class Tank{
  constructor(xPos, yPos, direction, maxVel, accelRate, turnRate)
  {
    //Tank Traits
      this.maxVel = maxVel;
      this.accelRate = accelRate;
      this.turnRate = 0.01 * turnRate
    //Initial Contitions
      this.linVel = 0;
      this.angVel = 0;
    //Matter Object
      this.body = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, { frictionAir: TANK_FRICTION });
    //set initial rotation of tank
      Body.rotate(this.body, direction * Math.PI / 180);
  }
/*
  fire(){
    let bullet = new Bullet(canvasWidth,canvasHeight, this);
  }
*/
  accelerate(direction)
  {
    if(direction && this.linVel < this.maxVel){
      this.linVel += this.accelRate;
    }else if(!direction && this.linVel > -this.maxVel){
      this.linVel -= this.accelRate;
    }
  }

  deccelerate()
  {
    if(this.linVel < 0.5 && this.linVel > -0.5){
      this.linVel = 0;
    }else{
      this.linVel *= 0.9;
    }
  }

  turnLeft()
  {
    this.angVel = -this.turnRate;
  }

  turnRight()
  {
    this.angVel = this.turnRate;
  }

  stopTurn()
  {
    this.angVel = 0;
  }

  update()
  {
    //update speed
    if(KEY_MAP[W_KEY]){
      this.accelerate(1);
    }else if(KEY_MAP[S_KEY]){
      this.accelerate(0);
    }else{
      this.deccelerate();
    }

    //update direction
    if(KEY_MAP[A_KEY]){
      this.turnLeft();
    }else if(KEY_MAP[D_KEY]){
      this.turnRight();
    }else{
      this.stopTurn();
    }

    //fire cannon
    if(KEY_MAP[SPACE_KEY]){
    }

    //update position of Matter Object
    if(this.angVel != 0){
      Body.rotate(this.body, this.angVel);
    }
    if(this.linVel != 0){
      Body.setVelocity(this.body, 
        { x: -Math.cos(this.body.angle)*this.linVel, y: -Math.sin(this.body.angle)*this.linVel});
    }
  }
};
