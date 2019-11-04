//Use this file to forward declare Global CONST & VAR

//USEFUL CONSTANTS
const TAU = Math.PI * 2;


//MATTER-JS INTERFACES
const Engine = Matter.Engine;  //engine interface
const Render = Matter.Render;  //render interface
const Runner = Matter.Runner;  //runner interface
const World = Matter.World;    //world interface
const Bodies = Matter.Bodies;  //bodies interface
const Body = Matter.Body;      //body interface
const Events = Matter.Events;  //events interface


//WORLD CONSTANTS & CANVAS CONSTANTS
const canvas = document.getElementById("gameScreen");
const CANVAS_WIDTH = 1070;
const CANVAS_HEIGHT = 700;
const EAST_WIND = 0;
const NORTH_WIND = 0;


//CONTROLLER CONSTANTS
var KEY_MAP = {}; //map for currently pressed keys
const W_KEY = 87;
const S_KEY = 83;
const A_KEY = 65;
const D_KEY = 68;
const SPACE_KEY = 32;
document.addEventListener("keydown", event => {
    KEY_MAP[event.keyCode] = 1;
});
  document.addEventListener("keyup", event => {
    KEY_MAP[event.keyCode] = 0;
});


//Tank Constants
const TANK_WIDTH = 50;
const TANK_HEIGHT = 50;
const TANK_FRICTION = 0.2;


//Bullet Constants
const BULLET_FRICTION = 0.0;


//BARRIER CONSTANTS
const BARRIER_FRICTION = 0.8;

//PLAYER INFO
const PLAYERNUM = 1;

//GENERAL PURPOSE FUNCTIONS
//Movement Controller
function OBJECT_CONTROLLER(obj){
    if(obj.playerNum == PLAYERNUM){
        //update speed
        if(KEY_MAP[W_KEY]){
            obj.accelerate(1);
        }else if(KEY_MAP[S_KEY]){
            obj.accelerate(0);
        }else{
            obj.deccelerate();
        }

        //update direction
        if(KEY_MAP[A_KEY]){
            obj.turnLeft();
        }else if(KEY_MAP[D_KEY]){
            obj.turnRight();
        }else{
            obj.stopTurn();
        }

        //fire cannon
        if(KEY_MAP[SPACE_KEY]){
        }

        //send signals
    }else{
        //some socket.io stuff here
        //recieve signals
    }
}
//Update position of controlled objects
function OBJECT_MOVER(obj){
    if(obj.angVel != 0){
        Body.rotate(obj.body, obj.angVel);
    }
    if(obj.linVel != 0){
    Body.setVelocity(obj.body, 
        { x: -Math.cos(obj.body.angle)*obj.linVel, y: -Math.sin(obj.body.angle)*obj.linVel});
    }
}



