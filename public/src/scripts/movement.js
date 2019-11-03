class InputHandler{
  constructor(tank){
    document.addEventListener("keydown", event => {
      switch(event.keyCode)
      {
        case 87: //W
        tank.moveUp();
        break;

        case 65: //A
          tank.moveLeft();
          break;

        case 83: //S
          tank.moveDown();
        break;

        case 68: //D
          tank.moveRight();
          break;

        case 32: // Spacebar
           tank.fire();
           break;
      }
    });

    document.addEventListener("keyup", event => {
      switch(event.keyCode)
      {
        case 87: //W
        if(tank.ySpeed < 0)
          tank.stop();
          break;

        case 65: //A
        if(tank.xSpeed < 0)
          tank.stop();
        break;

        case 83: //S
        if(tank.ySpeed > 0)
          tank.stop();
          break;

        case 68: //D
        if(tank.xSpeed > 0)
          tank.stop();
        break;

        // case 32: // Spacebar
        //  tank.fire();
        //  break;
      }
    });

  }
};
