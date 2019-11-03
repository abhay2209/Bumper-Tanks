
const image = document.getElementById('tank');
const image1 = document.getElementById('bullet');

let matterInst = new matterObj;

let tank1 = new Tank(300, 300, 90, 4, 0.5, 3);
let tank1Controls = new InputHandler(tank1);

matterInst.addWalls();
matterInst.addTank(tank1);

matterInst.playSimulation();

/*
var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
*/
// Creates new tanks

