class Items_Power{
  constructor(power_up(xPos, yPos, width, length){
    this.body = Bodies.rectangle(xPos, yPos, width, length, {
      label: 'power',
      parent:this.body,
      render: {
        fillStyle: '#0000FF'
      }
    });
    Body.rotate(this.body, direction * Math.PI / 180);
  }
}

class Items_Health{
  constructor(power_up(xPos, yPos, width, length){
    this.body = Bodies.rectangle(xPos, yPos, width, length, {
        label: 'health',
        parent:this.body,
        render: {
          fillStyle: red
        }
      });
      Body.rotate(this.body, direction * Math.PI / 180);
  }
}

class Items_Poison{
  constructor(power_up(xPos, yPos, width, length){
    this.body = Bodies.rectangle(xPos, yPos, width, length, {
        label: 'poison',
        damage: 20,
        parent:this.body,
        render: {
          fillStyle: purple
        }
      });
      Body.rotate(this.body, direction * Math.PI / 180);
  }
}

class Items_Speed{
  constructor(power_up(xPos, yPos, width, length){
    this.body = Bodies.rectangle(xPos, yPos, width, length, {
        label: 'speed',
        parent:this.body,
        render: {
          fillStyle: orange
        }
      });
      Body.rotate(this.body, direction * Math.PI / 180);
  }
}

// class Items {
//   constructor(xPos, yPos, width, length){
//       var random = Math.floor(Math.random() * 4);
//       var item;
//
//       switch (random) {
//         case 1:
//           item = power_up(xPos, yPos, width, length);
//           break;
//         case 2:
//           item = health_pack(xPos, yPos, width, length);
//           break;
//         case 3:
//           item = poison(xPos, yPos, width, length);
//           break;
//         default:
//           item = speed_up(xPos, yPos, width, length);
//           break;
//       }
//       this.body = item;
//   }
//
//   power_up(xPos, yPos, width, length){
//     var powerUp = Bodies.rectangle(xPos, yPos, width, length, {
//         label: 'power',
//         parent:this.body,
//         render: {
//           fillStyle: '#0000FF'
//         }})
//     return powerUp;
//   }
//
//   health_pack(xPos, yPos, width, length){
//     var healthPack = Bodies.rectangle(xPos, yPos, width, length, {
//         label: 'health',
//         parent:this.body,
//         render: {
//           fillStyle: red
//         }})
//
//
//     return healthPack;
//   }
//
//   poison(xPos, yPos, width, length){
//     var poison = Bodies.rectangle(xPos, yPos, width, length, {
//         label: 'poison',
//         damage: 20,
//         parent:this.body,
//         render: {
//           fillStyle: purple
//         }})
//
//
//     return poison;
//   }
//
//   speed_up(xPos, yPos, width, length){
//     var speedUp = Bodies.rectangle(xPos, yPos, width, length, {
//         label: 'speed',
//
//         parent:this.body,
//         render: {
//           fillStyle: orange
//         }})
//
//
//     return speedUp;
//   }
// }
