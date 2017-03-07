let currentNavTile = null;
let charactersArray = ['bomb', 'flag', 'medicOut', 'sniperOut', 'soldierOut', 'tankOut'];
let randomSoldier;
let randomTank;

function Tile(game) {
	this.game = game;
}

Tile.prototype.load = function () {
	this.createInvisibleTiles();
	this.highlightTile();
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

Tile.prototype.charToImage = function (charId) {
	image = "";
	switch (charId) {
		case MenuItems.BOMB:
			image = "bomb";
			break;
		case MenuItems.FLAG:
			image = "flag";
			break;
		case MenuItems.MEDIC:
			image = "medicIn";
			break;
		case MenuItems.SNIPER:
			image = "sniperIn";
			break;
		case MenuItems.SOLDIER:
			if (Math.random() >= 0.5) {
				randomSoldier = 'soldierInWhite';
			} else {
				randomSoldier = 'soldierInBlack';
			}
			image = randomSoldier;
			break;
		case MenuItems.TANK:
			if (Math.random() >= 0.5) {
				randomTank = 'tankInWhite';
			} else {
				randomTank = 'tankInBlack';
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

	if (selectedTile === 0) {
		if (tileY !== 0) {
			if (Setup.handleCharacterLimit(selectedChar) && Setup.sideControl(playerAtSetup, tileX, tileY)) {
				tileData[tileY][tileX] = Character.makeCharacter();
				game.add.image(tileX * 44, tileY * 44, this.charToImage(character));

				selectedChar = null;
			}
		}
	}
}

Tile.prototype.createInvisibleTiles = function () {
	var context = this;

	game.input.onTap.add(function (pointer, event) {
		tileX = tileLayer.getTileX(pointer.x);
		tileY = tileLayer.getTileY(pointer.y);

		if (selectedChar !== null) {
			context.putCharacter(selectedChar, tileX, tileY);
		}

		if (tileY === 0) {
			selectedChar = tileX;
		}

	});
}

Tile.prototype.highlightTile = function () {

	for (let y = 0; y < 25; ++y) {
		for (let x = 0; x < 50; ++x) {
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

Tile.prototype.createNavTiles = function () {
	for (var i = 0; i < 6; ++i) {
		(function (i) {
			let image = game.add.image(tileSize * i, 0, charactersArray[i]);
			image.inputEnabled = true;
			image.input.useHandCursor = true;
		})(i);
	}
}

function over(item) {
	item.alpha = 0;
}

function out(item) {
	item.alpha = 1;
}

function clickNavTile(counter) {
	currentNavTile = counter;




}