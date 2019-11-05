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

      var tankHull = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, {
        render: {
          sprite: {
            texture: "http://localhost:5000/src/images/tankBodyMini.png"
        }}}),
        tankGun = Bodies.rectangle(xPos-TANK_WIDTH/3, yPos, TURRENT_WIDTH, 5, {
          render: {
            sprite: {
              texture: "http://localhost:5000/src/images/tankGunMini.png"
        }}})

      this.body = Body.create({
        parts: [tankHull, tankGun],
        frictionAir: TANK_FRICTION
      });

    //set initial rotation of tank
      Body.rotate(this.body, direction * Math.PI / 180);
  }

  bodyHelper(){
    var componentList = [];
  }

/*
  fire(){
    let bullet = new Bullet(this);
    this.bullets.push(bullet);
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
};
