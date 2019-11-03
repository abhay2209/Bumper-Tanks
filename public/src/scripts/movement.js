class InputHandler{
  constructor(tank){
    document.addEventListener("keydown", event => {
      KEY_MAP[event.keyCode] = 1;
    });

    document.addEventListener("keyup", event => {
      KEY_MAP[event.keyCode] = 0;
    });
  }
};
