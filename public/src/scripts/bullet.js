
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

class Bullet{
  constructor(tank){
    this.width = 5
    this.height = 1.5
    //this.x = where the tank at
    //this.y = where the tank at
    // this.maxSpeed = 4
    this.speed = 8 //discuss for weather condition
    this.numOfBullet = 5
    this.x = tank.x;
    this.y = tank.y + (tank.height/2) - 1.7;
    this.color = "yellow";
    // this.newBUllet = document.createElement('img');
    // this.newBUllet.src = '/src/normal_bullet.jpg'
    // this.newBUllet.classList.add('bullet');
    // this.newBUllet.style.left = '${this.x}px';
    // this.newBUllet.style.top = '${this.y - 10}px';
  }

  // moveBullet(bullet)
  // {
  //   let bulletInterval = setInterval(()=>{
      
  //     if(this.x === 300){
  //       bullet.remove()
  //     } else {
  //       this.x = '${this.x + 4}px'
  //     }
  //   }, 10)
  // }

  // effect()
  // {

  // }

  // reload()
  // {
    
  // }

  draw(ctx)
  {
    // ctx.drawImage(image, this.x, this.y, this.width, this.height);
    
    // ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  // AABB(ax, ay, aw, ah, bx, by, bw, bh) {
  //   return ax<bx+bw && ay<by+bh && bx<ax+aw && by<ay+ah;
  // }

  update()
  {
    // if(!frameRate)
    //   return;

    
    this.x -= this.speed;

    // if(this.AABB(this.x, this.y, this.width, this.height, tank.x, tank.y, tank.width, tank.height)){
    //   this.width = null;
    //   this.y -= 10;
    // }
    // if(this.x < 0)
    //   this.x = 0;

    // if(this.y < 0)
    //   this.y = 0;

    // if( this.x + this.width > 300 )
    //   this.x = 300 - this.width;

    // if( this.y + this.height > 150 )
    //     this.y = 150 - this.height;


    // if(!frameRate)
    //   return;

    // this.x += this.xSpeed;
    // this.y += this.ySpeed;

    // // if(this.x < 0 && this.y < 0 && this.x > 300 && this.y > 150) later 
      

    // if( this.x + this.width > 300 )
    //   this.x = 300 - this.width;

    // if( this.y + this.height > 150 )
    //     this.y = 150 - this.height;


  }

}

