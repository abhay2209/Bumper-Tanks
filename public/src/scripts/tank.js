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
      this.reloadTime = 1000;
      this.lastShot = 0
      this.bullet_damage = 10;
      this.bullet_size = 5.5;

      var tankHull = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, {
        label: 'tank',
        parent:this.body,
        render: {
          fillStyle: color[1]
        }}),
      tankGun = Bodies.rectangle(xPos-GUN_LENGTH/2-TURRENT_RADIUS, yPos, GUN_LENGTH, 5, {
        label: 'tank',
        render: {
          fillStyle: '#0d0d0d'
        }}),
      tankTurrent = Bodies.circle(xPos, yPos, TURRENT_RADIUS, {
        label: 'tank',
        parent:this.body,
        render: {
          fillStyle: color[0],
          strokeStyle: '#000000',
          lineWidth: 3
        }}),
      tankRightTrack = Bodies.rectangle(xPos, yPos+TANK_HEIGHT/2, TANK_WIDTH+5, 10, {
        label: 'tank',
        parent:this.body,
        render: {
          fillStyle: color[0],
          strokeStyle: '#000000',
          lineWidth: 3
        }}),
      tankLeftTrack = Bodies.rectangle(xPos, yPos-TANK_HEIGHT/2, TANK_WIDTH+5, 10, {
        label: 'tank',
        parent:this.body,
        render: {
          fillStyle: color[0],
          strokeStyle: '#000000',
          lineWidth: 3
        }});

      this.body = Body.create({
          health: health,
          parts:[tankLeftTrack, tankRightTrack, tankHull],
          frictionAir: TANK_FRICTION, 
          collisionFilter: { group: -1 }
      });

      this.turrentRing = Body.create({
        parts:[tankTurrent, tankGun],
        frictionAir: TANK_FRICTION,
        collisionFilter: { group: -1 }
      })

      this.turrentConstraint = Constraint.create({
        bodyA: this.body,
        bodyB: this.turrentRing,
        length: 0
      })

      Body.rotate(this.body, direction * Math.PI / 180);
      Body.rotate(this.turrentRing, direction * Math.PI / 180)
      return this;
  }

  fire_cannon(){
    var fired_bullet = new Bullet(this.turrentRing.position, this.turrentRing.angle, this.bullet_damage, this.bullet_size);
    World.add(worldObject, [fired_bullet.body]);
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
