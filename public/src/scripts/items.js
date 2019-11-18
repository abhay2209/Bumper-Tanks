class Items {
  constructor(xPos, yPos, width, length){
      var random = Math.floor(Math.random() * 4);
      var item;

      switch (random) {
        case 1:
          item = power_up(xPos, yPos, width, length);
          break;
        case 2:
          item = health_pack(xPos, yPos, width, length);
          break;
        case 3:
          item = poison(xPos, yPos, width, length);
          break;
        default:
          item = speed_up(xPos, yPos, width, length);
          break;
      }
  }

  power_up(xPos, yPos, width, length){
    var powerUp = Bodies.rectangle(xPos, yPos, width, length, {
        label: 'power',
        parent:this.body,
        render: {
          fillStyle: blue;
        }})


    return powerUp;
  }

  health_pack(xPos, yPos, width, length){
    var healthPack = Bodies.rectangle(xPos, yPos, width, length, {
        label: 'health',
        parent:this.body,
        render: {
          fillStyle: red;
        }})


    return healthPack;
  }

  poison(xPos, yPos, width, length){
    var poison = Bodies.rectangle(xPos, yPos, width, length, {
        label: 'poison',
        parent:this.body,
        render: {
          fillStyle: '#005504'
        }})


    return poison;
  }

  speed_up(xPos, yPos, width, length){
    var speedUp = Bodies.rectangle(xPos, yPos, width, length, {
        label: 'speed',
        parent:this.body,
        render: {
          fillStyle: '#005504'
        }})


    return speedUp;
  }
}
