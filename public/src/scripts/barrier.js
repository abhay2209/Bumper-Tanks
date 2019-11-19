class Barrier_Rectangle{
    constructor(xPos, yPos, direction, width, height){
        this.body = Bodies.rectangle(xPos, yPos, width, height, {
          label:'barrier',
          frictionAir: BARRIER_FRICTION,
          isStatic: true,
          render: {
            fillStyle: '#1506CF7'
          }
        });
        //set initial rotation of barrier
        Body.rotate(this.body, direction * Math.PI / 180);
    }
}

class Barrier_Circle{
    constructor(xPos, yPos, radius){
        this.body = Bodies.circle(xPos, yPos, radius, {
          label:'barrier',
          frictionAir: BARRIER_FRICTION
        });
        //set initial rotation of barrier
        Body.rotate(this.body, 0);
    }
}

class Barrier_Triangle{
    constructor(xPos, yPos, direction, radius){
        this.body = Bodies.polygon(xPos, yPos, 3, radius, {
          label:'barrier',
          frictionAir: BARRIER_FRICTION
        });
        //set initial rotation of barrier
        Body.rotate(this.body, direction * Math.PI / 180);
    }
}
