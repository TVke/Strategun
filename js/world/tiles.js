let currentNavTile = null;
let activePlayerPrefix = 'b';
let characterImagesArray = [activePlayerPrefix + 'bomb', activePlayerPrefix + 'flag', 'medicOut', 'sniperOut', 'soldierOut', 'tankOut'];
let characterNamesArray = ['Bomb', 'Flag', 'Medic', 'Sniper', 'Soldier', 'Tank'];
let randomSoldier, randomTank;

function Tile(game) {
	this.game = game;
}

Tile.prototype.load = function () {
	this.createInvisibleTiles();
	this.highlightTile();
}

TileStyles = {
	WALL: 1,
	OIL: 2,
};

MenuItems = {
	BOMB: 0,
	FLAG: 1,
	MEDIC: 2,
	SNIPER: 3,
	SOLDIER: 4,
	TANK: 5,
};

Tile.prototype.charToImage = function (charId) {
	image = "";
	switch (charId) {
		case MenuItems.BOMB:
			image = activePlayerPrefix + "bomb";
			break;
		case MenuItems.FLAG:
			image = activePlayerPrefix + "flag";
			break;
		case MenuItems.MEDIC:
			image = activePlayerPrefix + "medicIn";
			break;
		case MenuItems.SNIPER:
			image = activePlayerPrefix + "sniperIn";
			break;
		case MenuItems.SOLDIER:
			if (Math.random() >= .5) {
				randomSoldier = activePlayerPrefix + 'soldierInWhite';
			} else {
				randomSoldier = activePlayerPrefix + 'soldierInBlack';
			}
			image = randomSoldier;
			break;
		case MenuItems.TANK:
			if (Math.random() >= .5) {
				randomTank = activePlayerPrefix + 'tankInWhite';
			} else {
				randomTank = activePlayerPrefix + 'tankInBlack';
			}
			image = randomTank;
			break;
		default:
			break;
	}

	return image;
}

Tile.prototype.putCharacter = function (character, tileX, tileY) {
	selectedTile = tileData[tileX][tileY];

	console.log("x: " + tileX + " y: " + tileY);

	if (selectedTile === 0) {
		if (tileY !== 0) {

			if (Setup.handleCharacterLimit(selectedChar) && Setup.sideControl(playerAtSetup, tileX, tileY)) {
				tileData[tileX][tileY] = Character.makeCharacter();
				game.add.image(tileX * tileSize, tileY * tileSize, this.charToImage(character));
				selectedChar = null;
			}
		}
	}
}

Tile.prototype.createInvisibleTiles = function () {
	var context = this;


	/**
	 * Oude functie gebaseerd op bovenst tiles, moet uitgevoerd worden met events op de div
	 */

	// game.input.onTap.add(function (pointer, event) {
	// 	tileX = tileLayer.getTileX(pointer.x);
	// 	tileY = tileLayer.getTileY(pointer.y);

	// 	if (selectedChar !== null) {
	// 		context.putCharacter(selectedChar, tileX, tileY);
	// 	}

	// 	if (tileY === 0) {
	// 		selectedChar = tileX;
	// 	}

	// });
}

Tile.prototype.highlightTile = function () {
	for (let y = 0; y < amountOfFields; ++y) {
		for (let x = 0; x < amountOfRows; ++x) {
			let invisibleTile = game.add.graphics(0, 0);
			invisibleTile.beginFill(0xFFFFFF);
			invisibleTile.drawRect(tileSize * x, tileSize * y + tileSize, tileSize, tileSize);
			invisibleTile.inputEnabled = true;
			invisibleTile.input.useHandCursor = true;
			invisibleTile.events.onInputOver.add(over, this);
			invisibleTile.events.onInputOut.add(out, this);
		}
	}

}

function over(item) {
	item.alpha = 0;
}

function out(item) {
	item.alpha = 1;
}