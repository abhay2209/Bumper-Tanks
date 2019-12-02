function Bullet(position, angle, damage, size)
{
  var cosX = Math.cos(angle);
  var sinY = Math.sin(angle);
  body = Bodies.circle(position.x-cosX*TANK_WIDTH, position.y-sinY*TANK_WIDTH, size,{
    label: 'bullet',
    damage: damage,
    frictionAir: BULLET_FRICTION,
    render: {
      fillStyle: 'yellow'
    }
  });
  Body.setVelocity(body, { x: -cosX*10, y: -sinY*10 })
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