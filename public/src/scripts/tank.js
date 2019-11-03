
// Class to create tank objects
const TAU = Math.PI * 2;

class Tank{
  constructor(xPos, yPos, direction)
  {
    this.width = 50;
    this.height = 50;
    this.x = xPos;
    this.y = yPos;
    this.a = direction * Math.PI / 180; //convert from angle to radians
  }
/*
  fire(){
    let bullet = new Bullet(canvasWidth,canvasHeight, this);
  }
*/
  moveUp()
  {
    var fx = Math.cos(this.body.angle)*3;
    var fy = Math.sin(this.body.angle)*3;

    Body.setVelocity(this.body, { x: -fx, y: -fy});
  }

  moveDown()
  {
    var fx = Math.cos(this.body.angle);
    var fy = Math.sin(this.body.angle);

    Body.setVelocity(this.body, { x: fx, y: fy});
  }

  moveLeft()
  {
    Body.rotate(this.body, -0.1);
  }

  moveRight()
  {
    Body.rotate(this.body, 0.1);
  }

  stop()
  {
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

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

    if(this.x < 0)
      this.x = 0;

    if(this.y < 0)
      this.y = 0;

    if( this.x + this.width > 300 )
      this.x = 300 - this.width;

    if( this.y + this.height > 150 )
        this.y = 150 - this.height;
  }
};
