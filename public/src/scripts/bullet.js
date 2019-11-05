class Bullet{
  constructor(tank){
    //this.width = 5
    //this.height = 1.5
    //this.speed = 8 //discuss for weather condition
    // this.numOfBullet = 5
    //this.x = tank.x;
    //this.y = tank.y + (tank.height/2) - 1.7;
    //this.color = "yellow";

    var x = tank.body.position.x;
    var y = tank.body.position.y;
    var angle = tank.body.angle;
    var cosX = Math.cos(angle);
    var sinY = Math.sin(angle);

    this.body = Bodies.rectangle(x-cosX*TANK_WIDTH, y-sinY*TANK_WIDTH, 5.5, 5.5,{
      frictionAir: BULLET_FRICTION,
      render: {
        fillStyle: 'yellow'
      }
    });

    Body.rotate(this.body, angle);
    Body.setVelocity(
      this.body,
    { x: -cosX*10, y: -sinY*10 })
  }
}
