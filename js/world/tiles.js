let currentNavTile = null;
let charactersArray = ['bomb', 'flag', 'medicOut', 'sniperOut', 'soldierOut', 'tankOut'];

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
			//TODO: random generate soldier in white en black;
			image = "soldierInWhite";
			break;
		case MenuItems.TANK:
			image = "tankInWhite";
			break;
		default:
			break;
	}


	return image;
}

Tile.prototype.putCharacter = function (character, tileX, tileY) {
	//TODO: Put character on screen;

	selectedTile = tileData[tileX][tileY];

	if (selectedTile === 0) {
		if (tileY !== 0) {
			if (Setup.handleCharacterLimit(selectedChar)) {
				tileData[tileX][tileY] = Character.makeCharacter();
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


		//clickTile(invisibleTile, x, y)
	});
}

Tile.prototype.highlightTile = function () {
	console.log("highlight");
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
			image.events.onInputUp.add(function () {
				clickNavTile(i)
			}, this);
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

	// if(counter == 0) {
	// 	currentNavTile = 'bomb';
	// }
	// if(counter == 1) {
	// 	currentNavTile = 'flag';
	// }
	// if(counter == 2) {
	// 	currentNavTile = 'medic';
	// }
	// if(counter == 3) {
	// 	currentNavTile = 'sniper';
	// }
	// if(counter == 4) {
	// 	currentNavTile = 'soldier';
	// }
	// if(counter == 5) {
	// 	currentNavTile = 'tank';
	// }
}

function clickTile(item, x, y) {
	// if(currentNavTile == 'bomb') {
	// 	console.log('bomb');
	// }
	// if(currentNavTile == 'flag') {
	// 	console.log('flag');
	// }
	// if(currentNavTile == 'medic') {
	// 	console.log('medic');
	// }
	// if(currentNavTile == 'sniper') {
	// 	console.log('sniper');
	// }
	// if(currentNavTile == 'soldier') {
	// 	console.log('soldier');
	// }
	// if(currentNavTile == 'tank') {
	// 	console.log('tank');
	// }
}