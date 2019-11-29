class Items{
  constructor(xPos, yPos, direction, width, length){
    var random = Math.floor(Math.random() * 4);

    switch (random) {
      case 1:
      this.body = Bodies.rectangle(xPos, yPos, width, length, {
        label: 'power',
        render: {
          fillStyle: '#0000FF'
        }
      });
      break;
      case 2:
      this.body =  Bodies.rectangle(xPos, yPos, width, length, {
          label: 'health',
          render: {
            fillStyle: '#FF0000'
          }
        });
      break;
      case 3:
      this.body =  Bodies.rectangle(xPos, yPos, width, length, {
          label: 'poison',
          damage: 20,
          render: {
            fillStyle: '#FF00FF'
          }
        });
      break;
      default:
      this.body =  Bodies.rectangle(xPos, yPos, width, length, {
          label: 'speed',
          render: {
            fillStyle: '#FFA500'
          }
        });
      break;
    }
  }
}
//
// class Items_Power{
//   constructor(xPos, yPos, direction, width, length){
//     this.body = Bodies.rectangle(xPos, yPos, width, length, {
//       label: 'power',
//       render: {
//         fillStyle: '#0000FF'
//       }
//     });
//     Body.rotate(this.body, direction * Math.PI / 180);
//   }
// }
//
// class Items_Health{
//   constructor(xPos, yPos, direction, width, length){
//     this.body = Bodies.rectangle(xPos, yPos, width, length, {
//         label: 'health',
//         render: {
//           fillStyle: '#FF0000'
//         }
//       });
//       Body.rotate(this.body, direction * Math.PI / 180);
//   }
// }
//
// class Items_Poison{
//   constructor(xPos, yPos, direction, width, length){
//     this.body = Bodies.rectangle(xPos, yPos, width, length, {
//         label: 'poison',
//         damage: 20,
//         render: {
//           fillStyle: '#FF00FF'
//         }
//       });
//       Body.rotate(this.body, direction * Math.PI / 180);
//   }
// }
//
// class Items_Speed{
//   constructor(xPos, yPos, direction, width, length){
//     this.body = Bodies.rectangle(xPos, yPos, width, length, {
//         label: 'speed',
//         render: {
//           fillStyle: '#FFA500'
//         }
//       });
//       Body.rotate(this.body, direction * Math.PI / 180);
//   }
// }
// //
// // class Items {
// //   constructor(xPos, yPos, width, length){
// //       var random = Math.floor(Math.random() * 4);
// //       var item;
// //
// //       switch (random) {
// //         case 1:
// //           item = power_up(xPos, yPos, width, length);
// //           break;
// //         case 2:
// //           item = health_pack(xPos, yPos, width, length);
// //           break;
// //         case 3:
// //           item = poison(xPos, yPos, width, length);
// //           break;
// //         default:
// //           item = speed_up(xPos, yPos, width, length);
// //           break;
// //       }
// //       this.body = item;
// //   }
// //
// //   power_up(xPos, yPos, width, length){
// //     var powerUp = Bodies.rectangle(xPos, yPos, width, length, {
// //         label: 'power',
// //         parent:this.body,
// //         render: {
// //           fillStyle: '#0000FF'
// //         }})
// //     return powerUp;
// //   }
// //
// //   health_pack(xPos, yPos, width, length){
// //     var healthPack = Bodies.rectangle(xPos, yPos, width, length, {
// //         label: 'health',
// //         parent:this.body,
// //         render: {
// //           fillStyle: red
// //         }})
// //
// //
// //     return healthPack;
// //   }
// //
// //   poison(xPos, yPos, width, length){
// //     var poison = Bodies.rectangle(xPos, yPos, width, length, {
// //         label: 'poison',
// //         damage: 20,
// //         parent:this.body,
// //         render: {
// //           fillStyle: purple
// //         }})
// //
// //
// //     return poison;
// //   }
// //
// //   speed_up(xPos, yPos, width, length){
// //     var speedUp = Bodies.rectangle(xPos, yPos, width, length, {
// //         label: 'speed',
// //
// //         parent:this.body,
// //         render: {
// //           fillStyle: orange
// //         }})
// //
// //
// //     return speedUp;
// //   }
// // }
