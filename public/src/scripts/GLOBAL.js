//Use this file to forward declare Global CONST & VAR
var worldObject;
var engineObject;


//USEFUL CONSTANTS
const TAU = Math.PI * 2;

//MATTER-JS INTERFACES
const Engine = Matter.Engine;           //engine interface
const Render = Matter.Render;           //render interface
const Runner = Matter.Runner;           //runner interface
const World = Matter.World;             //world interface
const Bodies = Matter.Bodies;           //bodies interface
const Body = Matter.Body;               //body interface
const Composite = Matter.Composite      //composite interface
const Events = Matter.Events;           //events interface


//WORLD CONSTANTS & CANVAS CONSTANTS
const canvas = document.getElementById("gameScreen");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const EAST_WIND = 0;
const NORTH_WIND = 0;


//CONTROLLER CONSTANTS
var KEY_MAP = {}; //map for currently pressed keys
const W_KEY = 87;
const S_KEY = 83;
const A_KEY = 65;
const D_KEY = 68;
const J_KEY = 74;
document.addEventListener("keydown", event => {
    KEY_MAP[event.keyCode] = 1;
});
  document.addEventListener("keyup", event => {
    KEY_MAP[event.keyCode] = 0;
});


//Tank Constants
const TANK_WIDTH = 60;
const TANK_HEIGHT = 35;
const TURRENT_RADIUS = 16;
const GUN_LENGTH = 23;
const TANK_FRICTION = 0.3;


//Bullet Constants
const BULLET_FRICTION = 0.0;
const BULLET_DAMAGE = 10;

//BARRIER CONSTANTS
const BARRIER_FRICTION = 0.99;
