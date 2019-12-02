// Class to create tank objects
class Tank{
  constructor(xPos, yPos, direction, maxVel, accelRate, turnRate, playerNum, health, color)
  {
      this.playerNum = playerNum;
      this.maxVel = maxVel;
      this.accelRate = accelRate;
      this.turnRate = 0.01 * turnRate;
      this.linVel = 0;
      this.angVel = 0;
      this.angVel2 = 0;
      this.reloadTime = 400;
      this.lastShot = 0
      this.bullet_damage = 10;
      this.bullet_size = 5.5;
      this.bullet_power = 0;
      this.bulletAmount = 0;

      var tankHull = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, {
        label: 'tank',
        pNum: playerNum, 
        parent:this.body,
      
        render: {
          fillStyle: color[1]
        }}),
      tankGun = Bodies.rectangle(xPos-GUN_LENGTH/2-TURRENT_RADIUS, yPos, GUN_LENGTH, 5, {
        label: 'tank',
        pNum: playerNum,
        render: {
          fillStyle: '#0d0d0d'
        }}),
      tankTurrent = Bodies.circle(xPos, yPos, TURRENT_RADIUS, {
        label: 'tank',
        pNum: playerNum,
        render: {
          fillStyle: color[0],
          strokeStyle: '#000000',
          lineWidth: 3
        }}),
      tankRightTrack = Bodies.rectangle(xPos, yPos+TANK_HEIGHT/2, TANK_WIDTH+5, 10, {
        label: 'tank',
        pNum: playerNum,
        render: {
          fillStyle: color[0],
          strokeStyle: '#000000',
          lineWidth: 3
        }}),
      tankLeftTrack = Bodies.rectangle(xPos, yPos-TANK_HEIGHT/2, TANK_WIDTH+5, 10, {
        label: 'tank',
        pNum: playerNum,
        render: {
          fillStyle: color[0],
          strokeStyle: '#000000',
          lineWidth: 3
        }});
      this.healthBar = Bodies.rectangle(xPos, yPos , 7, health/3.5,{
        label: 'bar',
        parent:this.body,
        
        render: {
        fillStyle: 'orange',
        strokeStyle: '#000000',
        lineWidth: 3,
        

        }});
      

      this.body = Body.create({
          health: health,
          pNum: playerNum,
          parts:[tankLeftTrack, tankRightTrack, tankHull],
          frictionAir: TANK_FRICTION, 
          collisionFilter: { group: -1 }
      });
     

      this.turrentRing = Body.create({
        pNum: playerNum,
        parts:[tankTurrent, tankGun],
        frictionAir: TANK_FRICTION,
        collisionFilter: { group: -1 }
      })

      this.turrentConstraint = Constraint.create({
        bodyA: this.body,
        bodyB: this.turrentRing,
        length: 0
      })
      this.healthConstraint = Constraint.create({
        bodyA: this.body,
        bodyB: this.healthBar,
        length: 0
      })

      Body.rotate(this.body, direction * Math.PI / 180);
      Body.rotate(this.turrentRing, direction * Math.PI / 180)
      return this;
  }

  // tempPowerup(){
  //   console.log("bullshit");
  //   this.bullet_damage *= 2;
  //   this.bulle_size *= 6;
  //   setTimeout(regPower, 10000);
  // }
  regPower(){
    this.bullet_damage = 10;
    this.bullet_size = 5.5;
    this.bullet_power = 0;
  }

  fire_cannon(){
    if (this.bullet_power == 1)
    {
      this.bullet_size = 20;
      this.bullet_damage = 20;
    }
    else{
      this.bullet_size = 5.5;
      this.bullet_damage = 10;
    }

    if(this.bulletAmount == 3)
    {
      World.add(worldObject, 
        [Bullet(this.turrentRing.position, this.turrentRing.angle + 0.175, this.bullet_damage, this.bullet_size)]);

      World.add(worldObject, 
        [Bullet(this.turrentRing.position, this.turrentRing.angle - 0.175, this.bullet_damage, this.bullet_size)]);
    }

    World.add(worldObject, 
      [Bullet(this.turrentRing.position, this.turrentRing.angle, this.bullet_damage, this.bullet_size)]);
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

  turrentLeft()
  {
    this.angVel2 = -this.turnRate;
  }

  turrentRight()
  {
    this.angVel2 = this.turnRate;
  }

  stopTurrent()
  {
    this.angVel2 = 0;
  }
  tankDeath(health)
  {
    
    if(health==90)
    {
      World.remove(worldObject, [this.body, this.turrentRing, this.turrentConstraint, this.healthBar,this.healthConstraint]);

    }
  }


};

try{
  module.exports = {
    sayHello: function(){
    return "Hello";
  }
}
}
catch(err)
{

}
