
// Class to create tank objects


class Tank{
  constructor(canvasWidth, canvasHeight)
  {
    this.width = 30;
    this.height = 15;
    this.x = 0;
    this.y = 0;
    this.maxSpeed = 4;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.bullets = [];
  }

  fire(){
    let bullet = new Bullet(this);
    this.bullets.push(bullet);
  }

  moveUp()
  {
    this.ySpeed = -this.maxSpeed;
  }

  moveDown()
  {
    this.ySpeed = this.maxSpeed;
  }

  moveLeft()
  {
    this.xSpeed = -this.maxSpeed;
  }

  moveRight()
  {
    this.xSpeed = this.maxSpeed;
  }

  stop()
  {
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  draw(ctx)
  {
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
    for (var i = 0; i<this.bullets.length ; i++){
      this.bullets[i].draw(ctx);
    }
  }

  update(frameRate)
  {
    if(!frameRate)
      return;

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.x < 0)
      this.x = 0;

    if(this.y < 0)
      this.y = 0;

    if( this.x + this.width > 300 )
      this.x = 300 - this.width;

    if( this.y + this.height > 150 )
        this.y = 150 - this.height;

    for (var i = 0; i<this.bullets.length ; i++){
      this.bullets[i].update();
    }
    
  }
};
