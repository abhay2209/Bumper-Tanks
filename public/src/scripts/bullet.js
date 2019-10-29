class Bullet{
  constructor(canvasWidth, canvasHeight, tank){
    this.width = 2.5
    this.height = 1.5
    //this.x = where the tank at
    //this.y = where the tank at
    this.maxSpeed = 4
    this.xSpeed = 0 //discuss for weather condition
    this.ySpeed = 0 //discuss for weather condition
    this.numOfBullet = 5
    this.normal = 0
    this.othertype1 = 0
    this.othertype2 = 0
    this.othertype3 = 0
    this.othertype4 = 0
    this.x = tank.x;
    this.y = tank.y;
  }

  fire()
  {

  }
  // effect()
  // {

  // }

  draw(ctx)
  {
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }

  update(frameRate)
  {
    if(!frameRate)
      return;

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // if(this.x < 0 && this.y < 0 && this.x > 300 && this.y > 150) later


    if( this.x + this.width > 300 )
      this.x = 300 - this.width;

    if( this.y + this.height > 150 )
        this.y = 150 - this.height;
  }

}
