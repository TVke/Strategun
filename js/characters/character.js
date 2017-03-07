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
    game.load.image('selected','assets/grid/selected.png');
}

Character.prototype.move = function(){
    //TODO: Movement
}

Character.moveableLocation = function(x, y){
    game.add.sprite(x*44,y*44,'selected');
}

Character.events = function(){

    game.input.onTap.add(function(pointer, event){
        var context = this;
        tileX = tileLayer.getTileX(pointer.x);
        tileY = tileLayer.getTileY(pointer.y);

        neighbours = Coords.neighbours(tileX, tileY);
        selectedTile = tileData[tileX][tileY];
        var moveableCharacter = true;
        if(moveableCharacter && gameStarted){
            for (var neightbour in neighbours) {
                if(tileData[neighbours[neightbour][0]][neighbours[neightbour][1]] === 0){
                    context.Character.moveableLocation(neighbours[neightbour][0],neighbours[neightbour][1]);
                }

            }
        }

        // console.log(neighbours);
        // console.log("x: "+tileX+" y: "+tileY);


        if(selectedTile === TileStyles.WALL){
            console.log("it's a wall");
        }else if(selectedTile === TileStyles.OIL){
            console.log("it's oil, lets burn");
        }

    });

}
