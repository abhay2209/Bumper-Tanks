
const image = document.getElementById('tank');
const image1 = document.getElementById('bullet');

var TANK_LIST = [
  new Tank(300, 300, 90, 4, 0.5, 3, 1)
];

var BARRIER_LIST = [
  new Barrier_Triangle(500, 500, 90, 50),
  new Barrier_Circle(800, 500, 100),
  new Barrier_Rectangle(40, 100, 90, 50, 100),
  new Barrier_Triangle(900, 200, 0, 25)
  /*new Barrier_Triangle(500, 500, 90, 50),
  new Barrier_Triangle(500, 500, 90, 50),
  new Barrier_Triangle(500, 500, 90, 50),
  new Barrier_Triangle(500, 500, 90, 50),
  new Barrier_Triangle(500, 500, 90, 50),
  new Barrier_Triangle(500, 500, 90, 50),*/
];

var matterInst = new matterObj();
matterInst.initializeMap(TANK_LIST, BARRIER_LIST);
matterInst.playSimulation();

/*
var socket = io();
socket.on('message', function(data) {
  console.log(data);
});
*/
// Creates new tanks

