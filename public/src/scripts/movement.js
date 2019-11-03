class InputHandler{
  constructor(tank){
    document.addEventListener("keydown", event => {
      switch(event.keyCode)
      {
        case 87: //W
          tank.accelerate(1);
          break;

        case 65: //A
          tank.turnLeft();
          break;

        case 83: //S
          tank.accelerate(0);
          break;

        case 68: //D
          tank.turnRight();
          break;

        case 32: // Spacebar
           // fire();
           // break;
      }
    });

    document.addEventListener("keyup", event => {
      switch(event.keyCode)
      {
        case 87: //W
          tank.deccelerate(1);
          break;

        case 65: //A
          tank.stopTurn();
          break;

        case 83: //S
          tank.deccelerate(0);
          break;

        case 68: //D
          tank.stopTurn();
          break;

        case 32: // Spacebar
         // fire();
         // break;
      }
    });

  }
};
