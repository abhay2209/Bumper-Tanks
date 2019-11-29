class Bullet{
  constructor(tank,damage){

    var x = tank.body.position.x;
    var y = tank.body.position.y;
    var angle = tank.body.angle;
    var cosX = Math.cos(angle);
    var sinY = Math.sin(angle);
    var xWind = Math.cos((-wind_direction+90)*Math.PI /180)*0.5;
    var yWind = Math.sin((-wind_direction+90)*Math.PI / 180)*0.5;
    this.body = Bodies.rectangle(x-cosX*TANK_WIDTH, y-sinY*TANK_WIDTH, 5.5, 5.5,{
      label: 'bullet',
      damage:damage,
      frictionAir: BULLET_FRICTION,

      render: {
        fillStyle: 'yellow'
      }
    });

    Body.setVelocity(
      this.body,
    { x: -cosX*10+xWind, y: -sinY*10-yWind})

  }
}
