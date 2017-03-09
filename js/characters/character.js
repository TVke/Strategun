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

    movePieceSound = game.add.audio('move_piece');
    movePieceSound.play();
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
            if (Character.placeable(neighbours[neightbour][0], neighbours[neightbour][1]) === 1) {
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
            Character.drawShootRange(neightbour, neighbours)
        }
    }

    characterMode = "shoot";
}

Character.placeable = function (tileX, tileY) {
    console.log("shoot");
    console.log("x: " + tileX + "y: " + tileY);

    if (tileX < 0 || tileY < 0 || tileX >= amountOfRows || tileY >= amountOfFields) {
        return 0;
    }

    tile = tileData[tileX][tileY];

    if(tile === undefined){
        return 0;
    }

    if (tile === 0) {
        return 1;
    } else if (tile.constructor === Character) {
        return 2;
    } else {
        return 0;
    }
}

Character.tileControl = function (tileX, tileY, rangeTile) {
    placeable = Character.placeable(tileX, tileY);

    if (placeable === 1) {
        Character.moveableLocation(tileX, tileY, true);
    } else if (placeable === 2) {
        Character.moveableLocation(tileX, tileY, true);
        rangeTile = selectedObject.range + 1;
    } else {
        rangeTile = selectedObject.range;
    }

    return rangeTile;
}

Character.drawShootRange = function (neightbour, neighbours) {
    for (let rangeTile = 0; rangeTile < selectedObject.range; rangeTile++) {
        if (neightbour === "Bottom") {
            tileX = neighbours[neightbour][0] + 1;
            tileY = neighbours[neightbour][1] + rangeTile + 1;

            rangeTile = Character.tileControl(tileX, tileY, rangeTile);
        } else if (neightbour === "Left") {
            tileX = neighbours[neightbour][0] - rangeTile - 1;
            tileY = neighbours[neightbour][1] + 1;

            rangeTile = Character.tileControl(tileX, tileY, rangeTile);
        } else if (neightbour === "Right") {
            tileX = neighbours[neightbour][0] + rangeTile + 1;
            tileY = neighbours[neightbour][1] - 1;

            rangeTile = Character.tileControl(tileX, tileY, rangeTile);
        } else if (neightbour === "Top") {
            tileX = neighbours[neightbour][0] - 1;
            tileY = neighbours[neightbour][1] - rangeTile - 1;

            rangeTile = Character.tileControl(tileX, tileY, rangeTile);
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