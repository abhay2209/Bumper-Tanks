class Bullet{
  constructor(tank,damage){

    var x = tank.body.position.x;
    var y = tank.body.position.y;
    var angle = tank.body.angle;
    var cosX = Math.cos(angle);
    var sinY = Math.sin(angle);
    this.damage = damage;


    this.body = Bodies.rectangle(x-cosX*TANK_WIDTH, y-sinY*TANK_WIDTH, 5.5, 5.5,{
      label: 'bullet',
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
