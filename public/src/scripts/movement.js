<<<<<<< HEAD
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
    case 32: // Space
      movement.shoot = true;
      socket.emit('new bullet');
      break;
=======
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

>>>>>>> 6e35a556dc4c43bcbec38b225f7bf3cbeeb6fc9b
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});
