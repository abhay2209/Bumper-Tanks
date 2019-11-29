var tank = require ("../public/src/sripts/tank.js");

var chai = require('chai');
describe ('tank',function()){
  new Tank(300, 300, 0, 4, 0.5, 3, 1,100);
  it('should return true', function(){
    //(xPos, yPos, direction, maxVel, accelRate, turnRate, playerNum,health)
      var tankXposition = Tank.xPos;
      assert.equal(300,300);
});
}
