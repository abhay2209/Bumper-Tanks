function Bullet(position, angle, damage, size)
{
  var cosX = Math.cos(angle);
  var sinY = Math.sin(angle);
  var xWind = Math.cos((-wind_direction+90)*Math.PI /180)*0.5;
  var yWind = Math.sin((-wind_direction+90)*Math.PI / 180)*0.5;
  body = Bodies.circle(position.x-cosX*TANK_WIDTH, position.y-sinY*TANK_WIDTH, size,{
    label: 'bullet',
    damage: damage,
    frictionAir: BULLET_FRICTION,
    render: {
      fillStyle: 'yellow'
    }
  });
  Body.setVelocity(body, { x: -cosX*8+xWind, y: -sinY*8-yWind })
  return body
}

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