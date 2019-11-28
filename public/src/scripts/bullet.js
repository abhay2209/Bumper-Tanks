function bullet(position, angle, damage)
{
  var cosX = Math.cos(angle)
  var sinY = Math.sin(angle)
  var body = Bodies.circle(position.x - cosX * TANK_WIDTH, position.y - sinY * TANK_WIDTH, 3,
  {
    label: 'bullet',
    damage: damage,
    frictionAir: BULLET_FRICTION,
    render: { fillStyle: 'yellow' }
  })

  Body.setVelocity(body, { x: -cosX*10, y: -sinY*10 })
  return body
}
