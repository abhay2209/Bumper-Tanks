class Bullet{
  constructor(position, angle, damage, size){

    var cosX = Math.cos(angle);
    var sinY = Math.sin(angle);
    this.body = Bodies.circle(position.x-cosX*TANK_WIDTH, position.y-sinY*TANK_WIDTH, size,{
      label: 'bullet',
      damage: damage,
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
