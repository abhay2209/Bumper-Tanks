// Class to create tank objects
class Tank{
  constructor(xPos, yPos, direction, maxVel, accelRate, turnRate, playerNum,health)
  {
      this.playerNum = playerNum;
    //Tank Traits
      this.maxVel = maxVel;
      this.accelRate = accelRate;
      this.turnRate = 0.01 * turnRate;
    //Initial Contitions
      this.linVel = 0;
      this.angVel = 0;
      this.bullet_damage = 10;
      this.bullet_size = 5.5;
      this.bullet_power = 0;
      this.bulletAmount = 0;
    //Matter Object
      //this.body = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, {
      //  frictionAir: TANK_FRICTION,

      //});
      var tankHull = Bodies.rectangle(xPos, yPos, TANK_WIDTH, TANK_HEIGHT, {
        label: 'tank',
        parent:this.body,
        render: {
          fillStyle: '#005504'
        }}),
      tankGun = Bodies.rectangle(xPos-GUN_LENGTH/2-TURRENT_RADIUS, yPos, GUN_LENGTH, 5, {
        label: 'tank',
        render: {
          fillStyle: '#7A8E7B'
        }}),
      tankTurrent = Bodies.circle(xPos, yPos, TURRENT_RADIUS, {
        label: 'tank',
        parent:this.body,
        render: {
          fillStyle: '#005504',
          strokeStyle: '#000000',
          lineWidth: 3
        }}),
      tankRightTrack = Bodies.rectangle(xPos, yPos+TANK_HEIGHT/2, TANK_WIDTH+5, 10, {
        label: 'tank',
        parent:this.body,
        render: {
          fillStyle: '#5c5c5c',
          strokeStyle: '#000000',
          lineWidth: 3
        }}),
      tankLeftTrack = Bodies.rectangle(xPos, yPos-TANK_HEIGHT/2, TANK_WIDTH+5, 10, {
        label: 'tank',
        parent:this.body,
        render: {
          fillStyle: '#5c5c5c',
          strokeStyle: '#000000',
          lineWidth: 3
        }});

      this.body = Body.create({
          health: health,
          parts:[tankLeftTrack, tankRightTrack, tankHull, tankTurrent, tankGun],
          //parts: [tankLeftTrack, tankRightTrack, tankHull, tankTurrent, tankGun],
          frictionAir: TANK_FRICTION

      });

    //set initial rotation of tank
      Body.rotate(this.body, direction * Math.PI / 180);
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
    this.bulle_size = 5.5;
    this.bullet_power = 0;
  }

  bodyHelper(){
    var componentList = [];
  }

  fire_cannon(){
    if (this.bullet_power == 1)
    {
      this.bullet_size = 30;
      this.bullet_damage = 20;
    }
    else{
      this.bullet_size = 5.5;
      this.bullet_damage = 10;
    }

    if(this.bulletAmount == 3)
    {
      var fired_bullet = new Bullet(this, this.bullet_damage, this.bullet_size);
      fired_bullet.increaseAngle();
      World.add(worldObject, [fired_bullet.body]);

      var fired_bullet = new Bullet(this, this.bullet_damage, this.bullet_size);
      fired_bullet.decreaseAngle();
      World.add(worldObject, [fired_bullet.body]);
    }

    var fired_bullet = new Bullet(this, this.bullet_damage, this.bullet_size);
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
