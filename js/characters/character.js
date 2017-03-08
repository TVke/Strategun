function Character() {}

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

Character.selectedListener = function (neighbours, x, y, selectedObject) {
    for (let sprite = 0; sprite < selectedSprites.length; sprite++) {
        Character.move(neighbours, x, y, selectedObject);
    }
}

Character.isValidMove = function (x, y) {
    moveable = false;

    for (let sprite = 0; sprite < selectedSprites.length; sprite++) {
        spriteX = selectedSprites[sprite].position.x;
        spriteY = selectedSprites[sprite].position.y;

        spriteTile = Tile.calcTileFromSprite(spriteX, spriteY);

        if (spriteTile.x === x && spriteTile.y === y) {
            moveable = true;
        }
    }

    return moveable;
}

Character.move = function (neighbours, x, y, objectToMove) {

    tileX = tileLayer.getTileX(x);
    tileY = tileLayer.getTileY(y);

    if (!Character.isValidMove(tileX, tileY)) {
        return;
    }

    Tile.putCharacter(objectToMove.assetId, tileX, tileY, false);

    Character.destroySelected();
    characterSelected = false;

    tileData[objectToMove.tilePosition.x][objectToMove.tilePosition.y] = 0;

    objectToMove.sprite.destroy();
}

Character.shoot = function () {

}

Character.isMoveable = function (selectedTile) {
    var moveable = false;

    //Het moet zo want als ik me niet moveable doe dan gaan hem buggen
    if (
        selectedTile instanceof Soldier ||
        selectedTile instanceof Medic ||
        selectedTile instanceof Sniper ||
        selectedTile instanceof Tank
    ) {
        moveable = true;
    }

    return moveable;
}

Character.handleMove = function (context, neighbours, pointer) {
    console.log("move");
    if (characterSelected) {
        context.selectedListener(neighbours, pointer.x, pointer.y, selectedObject);
    } else {
        if (moveableCharacter && gameStarted) {
            context.destroySelected();
            for (var neightbour in neighbours) {
                if (tileData[neighbours[neightbour][0]][neighbours[neightbour][1]] === 0) {
                    Character.moveableLocation(
                        neighbours[neightbour][0],
                        neighbours[neightbour][1]
                    );
                }
            }
        }
    }
}

Character.placeTile = function (neighbours, neightbour) {

}

Character.handleShoot = function (context, neighbours, pointer) {
    console.log("shoot")
    Character.destroySelected();
    characterSelected = false;

    console.log(neighbours)

    if (moveableCharacter && gameStarted) {
        for (var neightbour in neighbours) {
            console.log(neightbour);

            if (tileData[neighbours[neightbour][0]][neighbours[neightbour][1]] === 0) {
                if (neightbour === "Bottom") {
                    Character.moveableLocation(
                        neighbours[neightbour][0]+1,
                        neighbours[neightbour][1]+selectedObject.range
                    );
                } else if (neightbour === "Left") {
                    Character.moveableLocation(
                        neighbours[neightbour][0]-selectedObject.range,
                        neighbours[neightbour][1]+1
                    );
                } else if (neightbour === "Right") {
                    Character.moveableLocation(
                        neighbours[neightbour][0]+selectedObject.range,
                        neighbours[neightbour][1]-1
                    );
                } else if (neightbour === "Top") {
                    Character.moveableLocation(
                        neighbours[neightbour][0]-1,
                        neighbours[neightbour][1]-selectedObject.range
                    );
                }

            }
        }
    }
}

Character.events = function () {
    var context = this;

    game.input.onTap.add(function (pointer, event) {

        tileX = tileLayer.getTileX(pointer.x);
        tileY = tileLayer.getTileY(pointer.y);

        neighbours = Coords.neighbours(tileX, tileY);
        selectedTile = tileData[tileX][tileY];

        if (Character.isMoveable(selectedTile)) {
            moveableCharacter = true;
            Character.destroySelected();
            characterSelected = false;
            selectedObject = selectedTile;
        } else {
            moveableCharacter = false;
        }

        context.handleMove(context, neighbours, pointer);

        if (clickedCount === 1) {
            context.handleMove(context, neighbours, pointer);
        } else if (clickedCount === 2) {
            context.handleShoot(context, neighbours, pointer);
        }

        clickedCount++;

        if (clickedCount > 2) {
            clickedCount = 1;
        }

    });

}