class Bullet{
  constructor(tank,damage, size){
    this.x = tank.body.position.x;
    this.y = tank.body.position.y;
    this.angle = tank.body.angle;
    this.cosX = Math.cos(this.angle);
    this.sinY = Math.sin(this.angle);
    this.damage = damage;
    this.size = size;
    this.body = Bodies.rectangle(this.x - this.cosX*TANK_WIDTH, this.y - this.sinY*TANK_WIDTH, this.size, 5.5,{
      label: 'bullet',
      damage: this.damage,
      frictionAir: BULLET_FRICTION,
      render: {
        fillStyle: 'yellow'
      }
    });
    Body.rotate(this.body, this.angle);
    Body.setVelocity(this.body, { x: -this.cosX*10, y: -this.sinY*10 })
    }

    increaseAngle(){
      this.angle = this.angle + 10;
      this.cosX = Math.cos(this.angle);
      this.sinX = Math.sin(this.angle);
      this.body = Bodies.rectangle(this.x - this.cosX*TANK_WIDTH, this.y - this.sinY*TANK_WIDTH, this.size, 5.5,{
        label: 'bullet',
        damage: this.damage,
        frictionAir: BULLET_FRICTION,
        render: {
          fillStyle: 'yellow'
        }
      });
      Body.rotate(this.body, this.angle);
      Body.setVelocity(
        this.body,
      { x: -this.cosX*10, y: -this.sinY*10 })

    }

    decreaseAngle(){
      this.angle = this.angle - 10;
      this.cosX = Math.cos(this.angle);
      this.sinX = Math.sin(this.angle);
      this.body = Bodies.rectangle(this.x - this.cosX*TANK_WIDTH, this.y - this.sinY*TANK_WIDTH, this.size, 5.5,{
        label: 'bullet',
        damage: this.damage,
        frictionAir: BULLET_FRICTION,
        render: {
          fillStyle: 'yellow'
        }
      });
      Body.rotate(this.body, this.angle);
      Body.setVelocity(
        this.body,
      { x: -this.cosX*10, y: -this.sinY*10 })

    }
  }
