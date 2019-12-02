// TESTING BULLET

var assert = require('chai').assert;
var Bullet = require('../public/src/scripts/bullet');
var Tank = require('../public/src/scripts/tank');

describe('Bullet constructor', function(){
  var tank = new Tank(1, 1, 1, 1, 1, 1, 1, 1);
  var bullet = new Bullet(tank, 1, 1);
  it('Tests Bullet constructor', function(){
    assert.equal(bullet.x, tank.body.position.x);
    assert.equal(bullet.y, tank.body.position.y);
    assert.equal(bullet.angle, tank.body.angle);
    assert.equal(bullet.cosX, Math.cos(bullet.angle));
    assert.equal(bullet.sinX, Math.sin(bullet.angle));
  });

});
