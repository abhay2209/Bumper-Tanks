export class Tank{
  constructor(canvasWidth, canvasHeight)
  {
    this.width = 150;
    this.height = 150;

    this.position = {
      x: canvasWidth/2 - this.width / 2,
      y: canvasHeight - this.height - 10,
    }
  }

  draw(ctx)
  {
    ctx.fillStyle = "red";
    ctx.fillRect(this.positon.x, this.position.y, this.width, this.height);
  }
};
