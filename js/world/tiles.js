let currentNavTile = null;
let activePlayerPrefix = 'b';
//let characterImagesArray = [activePlayerPrefix + 'bomb', activePlayerPrefix + 'flag', 'medicOut', 'sniperOut', 'soldierOut', 'tankOut'];
let characterNamesArray = ['Bomb', 'Flag', 'Medic', 'Sniper', 'Soldier', 'Tank'];
let randomSoldier, randomTank;

function Tile(game) {
	this.game = game;
}

Tile.prototype.load = function () {}

Tile.prototype.loadChar = function () {
	// Tile.putCharacter(4, 1, 1, false);
	// Tile.putCharacter(2, 1, 2, false);
	// playerAtSetup = 1;
	// Tile.putCharacter(4, 1, 3, false);
	// Tile.putCharacter(4, 2, 3, false);
	// playerAtSetup = 0;
	// gameStarted = true;
}

TileStyles = {
	WALL: 2,
	OIL: 1,
};

Tile.calcTileFromSprite = function (x, y) {
	return {
		x: (x / 44),
		y: (y / 44),
	}
}

Tile.charToImage = function (charId) {
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
			if (!gameStarted) {
				if (Math.random() >= .5) {
					randomSoldier = activePlayerPrefix + 'soldierInWhite';
				} else {
					randomSoldier = activePlayerPrefix + 'soldierInBlack';
				}
			}
			image = randomSoldier;
			break;
		case MenuItems.TANK:
			if (!gameStarted) {
				if (Math.random() >= .5) {
					randomTank = activePlayerPrefix + 'tankInWhite';
				} else {
					randomTank = activePlayerPrefix + 'tankInBlack';
				}
			}
			image = randomTank;
			break;
		default:
			break;
	}

	return image;
}

Tile.putCharacter = function (character, tileX, tileY, onPlacement) {
	selectedTile = tileData[tileX][tileY];
	position = {
		x: tileX,
		y: tileY
	}

	if (!onPlacement) {
		char = game.add.sprite(tileX * tileSize, tileY * tileSize, Tile.charToImage(character));
		tileData[tileX][tileY] = Character.makeCharacter(character, idForChar, playerAtSetup, position, char);
	} else if (Setup.handleCharacterLimit(selectedChar) && Setup.sideControl(playerAtSetup, tileX, tileY)) {
		char = game.add.image(tileX * tileSize, tileY * tileSize, Tile.charToImage(character));
		tileData[tileX][tileY] = Character.makeCharacter(character, idForChar, playerAtSetup, position, char);
	}
}
