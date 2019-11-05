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
      //this.body = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, {
      //  frictionAir: TANK_FRICTION,

      //});

      var tankHull = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, {
        render: {
          fillStyle: '#005504'
        }}),
      tankGun = Bodies.rectangle(xPos-GUN_LENGTH/2-TURRENT_RADIUS, yPos, GUN_LENGTH, 5, {
        render: {
          fillStyle: '#7A8E7B'
        }}),
      tankTurrent = Bodies.circle(xPos, yPos, TURRENT_RADIUS, {
        render: {
          fillStyle: '#005504',
          strokeStyle: '#000000',
          lineWidth: 3
        }}),
      tankRightTrack = Bodies.rectangle(xPos, yPos+TANK_HEIGHT/2, TANK_WIDTH+5, 10, {
        render: {
          fillStyle: '#5c5c5c',
          strokeStyle: '#000000',
          lineWidth: 3
        }}),
      tankLeftTrack = Bodies.rectangle(xPos, yPos-TANK_HEIGHT/2, TANK_WIDTH+5, 10, {
        render: {
          fillStyle: '#5c5c5c',
          strokeStyle: '#000000',
          lineWidth: 3
        }});
      

      this.body = Body.create({
        parts: [tankLeftTrack, tankRightTrack, tankHull, tankTurrent, tankGun],
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
