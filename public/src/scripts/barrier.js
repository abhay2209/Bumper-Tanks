class Barrier{
    constructor(xPos, yPos, direction, shape, size1, size2){
        this.x = xPos;
        this.y = yPos;
        this.a = direction;
        this.shape = shape;
        this.size1 = size1; //width or radius
        this.size2 = size2; //height if applicable
    }
}