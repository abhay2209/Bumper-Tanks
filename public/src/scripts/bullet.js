function Bullet(position, angle, damage, size)
{
  var cosX = Math.cos(angle);
  var sinY = Math.sin(angle);
  var WindX = Math.cos( ((parseFloat(wind_direction)-90) * Math.PI) / 180 )
  var WindY = Math.sin( ((parseFloat(wind_direction)-90) * Math.PI) / 180 )
  console.log(WindX, WindY)

  body = Bodies.circle(position.x-cosX*TANK_WIDTH, position.y-sinY*TANK_WIDTH, size,{
    label: 'bullet',
    damage: damage,
    frictionAir: BULLET_FRICTION,
    render: {
      fillStyle: 'yellow'
    }
  });
  Body.setVelocity(body, { x: -cosX*5 + WindX * 2, y: -sinY*5 + WindY * 2 })
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