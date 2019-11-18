class Items{
healthPack(tank){
tank.health= (tank.health+20);
if(tank.health>100)
tank.health=100;
}
}