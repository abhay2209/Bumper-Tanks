var assert = require('chai').assert;
var Tank = require('../public/src/scripts/tank');

describe('Tank constructor', function(){
  it('Hello from tank', function(){
    assert.equal(Tank.sayHello(), 'Hello');
  });
});
