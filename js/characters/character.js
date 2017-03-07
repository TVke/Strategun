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
    // Dummy function
}

Character.prototype.move = function(){
    //TODO: Movement
}

Character.moveableLocation = function(x, y){

}

Character.events = function(){

    game.input.onTap.add(function(pointer, event){
        tileX = tileLayer.getTileX(pointer.x);
        tileY = tileLayer.getTileY(pointer.y);

        neighbours = Coords.neighbours(tileX, tileY);
        selectedTile = tileData[tileX][tileY];
        console.log(neighbours);


        if(selectedTile === TileStyles.WALL){
            console.log("it's a wall");
        }else if(selectedTile === TileStyles.OIL){
            console.log("it's oil, lets burn");
        }

    });

}
