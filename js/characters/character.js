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

//return char object
Character.makeCharacter = function(character, id, player){
    charObject = null;
    switch (character) {
		case MenuItems.BOMB:
            charObject = new Bomb(id, player);
			break;
		case MenuItems.FLAG:
            charObject = new Flag(id, player);
			break;
		case MenuItems.MEDIC:
            charObject = new Medic(id, player);
			break;
		case MenuItems.SNIPER:
            charObject = new Sniper(id, player);
			break;
		case MenuItems.SOLDIER:
            charObject = new Soldier(id, player);
			break;
		case MenuItems.TANK:
            charObject = new Tank(id, player);
			break;
		default:
			break;
	}

    return charObject;
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
        selectedTile = tileData[tileY][tileX];
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

        //TODO: Remove if all good with map
        items = "";

        for(let y = 1; y <= 26; y++){
            for(let x = 0; x <= 50; x++){
                items += tileData[y][x];
            }
            items += "\n";
        }

    });

}