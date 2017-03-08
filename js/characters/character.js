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
Character.makeCharacter = function (character, id, player) {
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

    setup[player].idForChar++;

    return charObject;
}

Character.move = function () {
    //TODO: Movement


    Character.destroySelected();
    characterSelected = false;
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
}

Character.selectedListener = function () {
    for (let sprite = 0; sprite < selectedSprites.length; sprite++) {
        selectedSprites[sprite].events.onInputDown.add(Character.checkSelected, this);
    }
}

Character.checkSelected = function () {

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

        var moveableCharacter = false;

        if (selectedTile instanceof Soldier) {
            moveableCharacter = true;
        }

        if (characterSelected) {
            context.move();
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