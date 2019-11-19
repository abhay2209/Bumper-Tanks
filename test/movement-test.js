var assert = require('chai').assert;
var expect = require('chai').expect; //extra logging
var should = require('chai').should; //chaining

var Tank = require('../public/src/scripts/tank.js');
var Movement = require('../public/src/scripts/movement.js');

describe('#movement.js tests', function(){

    context('Tank can be controlled', function(){

        it('', function(){
            var tank = new Tank(1, 1, 1, 1, 1, 1, 1, 1);
            console.log(Tank);
            console.log(Movement);
        })

    })

})