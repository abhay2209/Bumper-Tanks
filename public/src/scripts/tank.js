
// Class to create tank objects
class Tank{
  constructor(xPos, yPos, direction, maxVel, accelRate, turnRate)
  {
    //Attributes
    this.width = 50;
    this.height = 50;

    this.maxVel = maxVel;
    this.accelRate = accelRate;
    this.turnRate = 0.01 * turnRate

    //Initial Contitions
    this.x = xPos;
    this.y = yPos;
    this.a = direction * Math.PI / 180; //convert from angle to radians
    this.linVel = 0;
    this.angVel = 0;
    //this.brakes = 1;
  }
/*
  fire(){
    let bullet = new Bullet(canvasWidth,canvasHeight, this);
  }
*/
  accelerate(direction)
  {
    //this.brakes = 0;
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
    if(KEY_MAP[W_KEY]){
      this.accelerate(1);
    }else if(KEY_MAP[S_KEY]){
      this.accelerate(0);
    }else{
      this.deccelerate();
    }

    if(KEY_MAP[A_KEY]){
      this.turnLeft();
    }else if(KEY_MAP[D_KEY]){
      this.turnRight();
    }else{
      this.stopTurn();
    }

    if(KEY_MAP[SPACE_KEY]){
    }


    //if(this.brakes){
    //  this.deccelerate();
    //}
    if(this.angVel != 0){
      Body.rotate(this.body, this.angVel);
    }
    if(this.linVel != 0){
      Body.setVelocity(this.body, 
        { x: -Math.cos(this.body.angle)*this.linVel, y: -Math.sin(this.body.angle)*this.linVel});
    }
  }
};
