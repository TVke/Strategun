function Character() {}

Character.load = function () {
    game.load.image('selected', 'assets/grid/selected.png');
    game.load.image('shoot', 'assets/grid/schiet.png');
}

//return char object
Character.makeCharacter = function (character, id, player, position, char) {

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

    idForChar++;

    return charObject;
}

Character.moveableLocation = function (x, y, shoot) {
    if (shoot) {
        var selectedSprite = game.add.sprite(x * tileSize, y * tileSize, 'shoot');
    } else {
        var selectedSprite = game.add.sprite(x * tileSize, y * tileSize, 'selected');
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

    if (characterMode === "move") {
        Character.move(neighbours, x, y, selectedObject);
    }

    if (enemy && characterMode === "shoot") {
        Character.shoot(neighbours, x, y, selectedObject);
    }

}

Character.endTurn = function () {
    Character.destroySelected();
    Turns.showEndTurn();
    clickedCount = 1;
    actionPerformed = true;
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

    Character.endTurn();
}

Character.damage = function (source, tileX, tileY) {
    target = tileData[tileX][tileY];

    target.health = target.health - source.attack;

    //bom knalt u dood
    if (target.type === "bomb") {
        source.health = 0;
        Soldier.attackAnimation(target, source);
    }

    Soldier.attackAnimation(source, target)
}

Character.heal = function (x, y, source) {
    tileX = tileLayer.getTileX(x);
    tileY = tileLayer.getTileY(y);

    target = tileData[tileX][tileY];

    if (source !== null) {
        if (source.type !== "medic") {
            return;
        }

        target.health = target.health + source.healing;

        if (target.health > target.maxHealth) {
            target.health = target.maxHealth + 0;
        }

        if (target.constructor === Character) {
            if (Character.isValidMove(tileX, tileY)) {
                Medic.healAnimation(source, target)

                Character.endTurn();
                return;
            }
        }
    }

}

Character.shoot = function (neighbours, x, y, objectToMove) {
    tileX = tileLayer.getTileX(x);
    tileY = tileLayer.getTileY(y);

    tile = tileData[tileX][tileY];

    if (tile.constructor === Character) {
        if (Character.isValidMove(tileX, tileY)) {
            shootSound = game.add.audio('fire')
            shootSound.play();
            Character.damage(selectedObject, tileX, tileY);

            Character.endTurn();
            return;
        }
    } else {

    }
}

Character.checkMoveableExist = function(){
    moveableExists = false;

    if(playerAtSetup === 0){
        loose = 1;
    }else if(playerAtSetup == 1){
        loose = 0;
    }

    for(let tileX = 0; tileX < amountOfRows; tileX++){
        for(let tileY = 0; tileY < amountOfFields; tileY++){
            tile = tileData[tileX][tileY];

            console.log(tile);
            if(tile instanceof Character){
                if(Character.isMoveable(tile) && tile.player === loose){
                    moveableExists = true;
                }
            }
        }
    }

    return moveableExists;
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
            if (Character.isPlaceable(neighbours[neightbour][0], neighbours[neightbour][1]) === 1) {
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

Character.isPlaceable = function (tileX, tileY) {
    if (tileX < 0 || tileY < 0 || tileX >= amountOfRows || tileY >= amountOfFields) {
        return 0;
    }

    tile = tileData[tileX][tileY];

    if (tile === undefined) {
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
    placeable = Character.isPlaceable(tileX, tileY);

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
        if (actionPerformed) {
            return;
        }

        tileX = tileLayer.getTileX(pointer.x);
        tileY = tileLayer.getTileY(pointer.y);

        neighbours = Coords.neighbours(tileX, tileY);
        selectedTile = tileData[tileX][tileY];

        if (selectedTile.player !== playerAtSetup) {
            context.selectedListener(neighbours, pointer.x, pointer.y, selectedObject, true);
            return;
        } else {
            Character.heal(pointer.x, pointer.y, selectedObject);
        }

        if (Character.isMoveable(selectedTile)) {
            moveableCharacter = true;
            Character.destroySelected();
            characterSelected = false;
            selectedObject = selectedTile;
        } else {
            moveableCharacter = false;
        }

        if (gameStarted) {
            Menu.showHealth(selectedTile.health);
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
