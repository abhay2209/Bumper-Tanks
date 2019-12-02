// TESTING TANK

var assert = require('chai').assert;
var Tank = require('../public/src/scripts/tank');

describe('Tank constructor', function(){
    var tank = new Tank(1, 1, 1, 1, 1, 1, 1, 1);
  it('Tests tank constructor', function(){
    assert.equal(tank.playerNum, 1);
    assert.equal(tank.maxVel, 1);
    assert.equal(tank.accelRate, 1);
    assert.equal(tank.turnRate, 0.01);
    assert.equal(tank.linVel, 0);
    assert.equal(tank.angVel, 0);
    assert.equal(tank.bullet_damage, 10);
    assert.equal(tank.bullet_size, 5.5);
  });

  it('Tests tank turn left function', function(){
    tank.turnLeft();
    assert.equal(tank.angVel, -tank.turnRate);
  });

  it('Tests tank turn right function', function(){
    tank.turnRight();
    assert.equal(tank.angVel, tank.turnRate);
  });

  it('Tests tank turn stop function', function(){
    tank.stopTurn();
    assert.equal(tank.angVel, 0);
  });

});
