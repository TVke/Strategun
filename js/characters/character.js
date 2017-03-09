function Character() {}

Character.load = function () {
    game.load.image('selected', 'assets/grid/selected.png');
    game.load.image('shoot', 'assets/grid/schiet.png');
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

Character.moveableLocation = function (x, y, shoot) {
    if (shoot) {
        var selectedSprite = game.add.sprite(x * 44, y * 44, 'shoot');
    } else {
        var selectedSprite = game.add.sprite(x * 44, y * 44, 'selected');
    }

    selectedSprites.push(selectedSprite)
    characterSelected = true;
}

Character.destroySelected = function () {
    for (let sprite = 0; sprite < selectedSprites.length; sprite++) {
        selectedSprites[sprite].destroy();
    }

    selectedSprites = [];
}

Character.selectedListener = function (neighbours, x, y, selectedObject, enemy) {
    console.log(enemy);
    for (let sprite = 0; sprite < selectedSprites.length; sprite++) {
        if (characterMode === "move") {
            Character.move(neighbours, x, y, selectedObject);
        }

        if (enemy && characterMode === "shoot") {
            Character.shoot(neighbours, x, y, selectedObject);
        }
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

Character.isEnemyChar = function () {

}

Character.shoot = function (neighbours, x, y, objectToMove) {
    tileX = tileLayer.getTileX(x);
    tileY = tileLayer.getTileY(y);

    //TODO: implementeer dat alles in range kan beschoten worden en dat schieten door muur illegaal is
    if (tileData[tileX][tileY].constructor === Character) {
        if (Character.isValidMove(tileX, tileY)) {
            console.log("you shot: " + tileData[tileX][tileY].id);
            return;
        }

    } else {
        console.log("you shot nobody");
    }
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
    if (moveableCharacter && gameStarted) {
        context.destroySelected();
        for (var neightbour in neighbours) {
            if (tileData[neighbours[neightbour][0]][neighbours[neightbour][1]] === 0) {
                Character.moveableLocation(
                    neighbours[neightbour][0],
                    neighbours[neightbour][1],
                    false
                );
            }
        }
    }

    characterMode = "move";
}

Character.handleShoot = function (context, neighbours, pointer) {
    Character.destroySelected();
    characterSelected = false;

    if (moveableCharacter && gameStarted) {
        for (var neightbour in neighbours) {
            for (let rangeTile = 0; rangeTile < selectedObject.range; rangeTile++) {
                if (neightbour === "Bottom") {
                    Character.moveableLocation(
                        neighbours[neightbour][0] + 1,
                        neighbours[neightbour][1] + rangeTile + 1,
                        true
                    );
                } else if (neightbour === "Left") {
                    Character.moveableLocation(
                        neighbours[neightbour][0] - rangeTile - 1,
                        neighbours[neightbour][1] + 1,
                        true
                    );
                } else if (neightbour === "Right") {
                    Character.moveableLocation(
                        neighbours[neightbour][0] + rangeTile + 1,
                        neighbours[neightbour][1] - 1,
                        true
                    );
                } else if (neightbour === "Top") {
                    Character.moveableLocation(
                        neighbours[neightbour][0] - 1,
                        neighbours[neightbour][1] - rangeTile - 1,
                        true
                    );
                }
            }
        }
    }

    characterMode = "shoot";
}

Character.events = function () {
    var context = this;

    game.input.onTap.add(function (pointer, event) {

        tileX = tileLayer.getTileX(pointer.x);
        tileY = tileLayer.getTileY(pointer.y);

        neighbours = Coords.neighbours(tileX, tileY);
        selectedTile = tileData[tileX][tileY];

        if (selectedTile.player !== playerAtSetup) {
            context.selectedListener(neighbours, pointer.x, pointer.y, selectedObject, true);
            return;
        }

        if (Character.isMoveable(selectedTile)) {
            moveableCharacter = true;
            Character.destroySelected();
            characterSelected = false;
            selectedObject = selectedTile;
        } else {
            moveableCharacter = false;
        }

        if (characterSelected) {
            context.selectedListener(neighbours, pointer.x, pointer.y, selectedObject, false);
        } else {
            if (clickedCount === 1) {
                context.handleMove(context, neighbours, pointer);
            } else if (clickedCount === 2) {
                context.handleShoot(context, neighbours, pointer);
            }
        }

        clickedCount++;

        if (clickedCount > 2) {
            clickedCount = 1;
        }



    });

}