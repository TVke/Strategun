let currentNavTile = null;
let activePlayerPrefix = 'b';
//let characterImagesArray = [activePlayerPrefix + 'bomb', activePlayerPrefix + 'flag', 'medicOut', 'sniperOut', 'soldierOut', 'tankOut'];
let characterNamesArray = ['Bomb', 'Flag', 'Medic', 'Sniper', 'Soldier', 'Tank'];
let randomSoldier, randomTank;

function Tile(game) {
	this.game = game;
}

Tile.prototype.load = function () {
	//this.createInvisibleTiles();
	this.highlightTile();
}

Tile.prototype.loadChar = function () {
	Tile.putCharacter(4, 1, 1, false);
}

TileStyles = {
	WALL: 2,
	OIL: 1,
};

MenuItems = {
	BOMB: 0,
	FLAG: 1,
	MEDIC: 2,
	SNIPER: 3,
	SOLDIER: 4,
	TANK: 5,
};

Tile.calcTileFromSprite = function(x, y){
	return {
		x: (x/44),
		y: (y/44),
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

Tile.putCharacter = function (character, tileX, tileY, onPlacement) {
	selectedTile = tileData[tileX][tileY];
	position = {
		x: tileX,
		y: tileY
	}

	if(!onPlacement){
		char = game.add.sprite(tileX * tileSize, tileY * tileSize, Tile.charToImage(character));
		tileData[tileX][tileY] = Character.makeCharacter(character, setup[playerAtSetup].idForChar, playerAtSetup, position, char);
	}else if (Setup.handleCharacterLimit(selectedChar) && Setup.sideControl(playerAtSetup, tileX, tileY)) {
		char = game.add.image(tileX * tileSize, tileY * tileSize, Tile.charToImage(character));
		tileData[tileX][tileY] = Character.makeCharacter(character, setup[playerAtSetup].idForChar, playerAtSetup, position, char);
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
			invisibleTile.beginFill(0xEFEFEF);
			invisibleTile.drawRect(tileSize * x, tileSize * y, tileSize, tileSize);
			invisibleTile.inputEnabled = true;
			invisibleTile.input.useHandCursor = true;
			invisibleTile.endFill();
		}
	}

}
