function Character() {
    this.id = 0;
    this.attack = 0;
    this.health = 0;
    this.range = 0;
    this.type = "";
    this.icon = "";
    this.asset = "";
}

Character.load = function () {
    game.load.image('selected', 'assets/grid/selected.png');
}

//return char object
Character.makeCharacter = function (character, id, player, position, char) {
    charObject = null;
    switch (character) {
        case MenuItems.BOMB:
            charObject = new Bomb(id, player, position, char);
            break;
        case MenuItems.FLAG:
            charObject = new Flag(id, player, position, char);
            break;
        case MenuItems.MEDIC:
            charObject = new Medic(id, player, position, char);
            break;
        case MenuItems.SNIPER:
            charObject = new Sniper(id, player, position, char);
            break;
        case MenuItems.SOLDIER:
            charObject = new Soldier(id, player, position, char);
            break;
        case MenuItems.TANK:
            charObject = new Tank(id, player, position, char);
            break;
        default:
            break;
    }

    setup[player].idForChar++;

    return charObject;
}

Character.moveableLocation = function (x, y) {
    var selectedSprite = game.add.sprite(x * 44, y * 44, 'selected');
    selectedSprites.push(selectedSprite)
    characterSelected = true;
}

Character.destroySelected = function () {
    for (let sprite = 0; sprite < selectedSprites.length; sprite++) {
        selectedSprites[sprite].destroy();
    }

    selectedSprites = [];
}

Character.selectedListener = function (neighbours, x, y, prevObject) {
    for (let sprite = 0; sprite < selectedSprites.length; sprite++) {
        console.log(selectedSprites[sprite]);
        Character.move(neighbours, x, y, prevObject);
    }
}

Character.move = function(neighbours, x, y, objectToMove) {
    

    tileX = tileLayer.getTileX(x);
    tileY = tileLayer.getTileY(y);

    Tile.putCharacter(4, tileX, tileY, false);

    console.log(selectedCharMov);

    Character.destroySelected();
    characterSelected = false;

    
    tileData[objectToMove.tilePosition.x][objectToMove.tilePosition.y] = 0;
    objectToMove.sprite.destroy();
    // selectedCharMov.charObj.destroy();

    // selectedCharMov.charObj = null;
    // selectedCharMov.x = null;
    // selectedCharMov.y = null;
}

Character.prototype.registerClick = function () {

}

Character.events = function () {
    var context = this;


    game.input.onTap.add(function (pointer, event) {

        tileX = tileLayer.getTileX(pointer.x);
        tileY = tileLayer.getTileY(pointer.y);

        neighbours = Coords.neighbours(tileX, tileY);
        selectedTile = tileData[tileX][tileY];

        if (selectedTile instanceof Soldier) {
            moveableCharacter = true;
            prevObject = selectedTile;
        }else{
            moveableCharacter = false;
        }



        if (characterSelected) {
            context.selectedListener(neighbours, pointer.x, pointer.y, prevObject);
        } else {
            if (moveableCharacter /*&& gameStarted*/ ) {
                context.destroySelected();
                for (var neightbour in neighbours) {
                    if (tileData[neighbours[neightbour][0]][neighbours[neightbour][1]] === 0) {
                        context.moveableLocation(neighbours[neightbour][0], neighbours[neightbour][1]);
                    }
                }
            }
        }



        // console.log(neighbours);
        // console.log("x: "+tileX+" y: "+tileY);


        if (selectedTile === TileStyles.WALL) {
            console.log("it's a wall");
        } else if (selectedTile === TileStyles.OIL) {
            console.log("it's oil, lets burn");
        }

    });

}