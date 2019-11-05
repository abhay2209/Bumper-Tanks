// Class to create tank objects
class Tank{
  constructor(xPos, yPos, direction, maxVel, accelRate, turnRate, playerNum)
  {
    this.playerNum = playerNum;
    //Tank Traits
      this.maxVel = maxVel;
      this.accelRate = accelRate;
      this.turnRate = 0.01 * turnRate;
    //Initial Contitions
      this.linVel = 0;
      this.angVel = 0;
    //Matter Object
      this.body = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, {
        frictionAir: TANK_FRICTION,
      });

      //this.body = Body.create({
      //  parts: []
      //})
    //set initial rotation of tank
      Body.rotate(this.body, direction * Math.PI / 180);
  }

  bodyHelper(){
    var componentList = [];
  }


  fire_cannon(){
    var fired_bullet = new Bullet(this)
    World.add(WWWZZZ, [fired_bullet.body]);
  }

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
};
