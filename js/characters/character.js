function Character(){
    this.id = 0;
    this.attack = 0;
    this.health = 0;
    this.range = 0;
    this.type = "";
    this.icon = "";
    this.asset = "";
}

Character.load = function(){
    //Dummy load
}

Character.prototype.move = function(){
    //TODO: Movement
}


Character.events = function(){

    game.input.onTap.add(function(pointer, event){
        console.log("x: " + tileLayer.getTileX(pointer.x) + " y:" + tileLayer.getTileY(pointer.y))
    });

}



