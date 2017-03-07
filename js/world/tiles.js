let currentNavTile = null;
let charactersArray = ['bomb', 'flag', 'medicOut', 'sniperOut', 'soldierOut', 'tankOut'];

function Tile(game){
  this.game = game;
}

Tile.prototype.load = function() {
	createInvisibleTiles();
}

TileStyles = {
	WALL: 2,
	OIL: 1,
}

function createInvisibleTiles() {
	for (let y = 0; y < 25; ++y) {
		for (let x = 0; x < 50; ++x) {
			let invisibleTile = game.add.graphics(0, 0);
			invisibleTile.beginFill(0xFFFFFF);
			invisibleTile.drawRect(tileSize * x, tileSize * y + tileSize, tileSize, tileSize);
			invisibleTile.inputEnabled = true;
			invisibleTile.input.useHandCursor = true;
			invisibleTile.events.onInputOver.add(over, this);
			invisibleTile.events.onInputOut.add(out, this);
			invisibleTile.events.onInputUp.add(function() { clickTile(invisibleTile, x, y) }, this);
		}
	}
}

Tile.prototype.createNavTiles = function() {
	for (var i = 0; i < 6; ++i) {
		(function(i) {
			let image = game.add.image(tileSize * i, 0, charactersArray[i]);
			image.inputEnabled = true;
			image.input.useHandCursor = true;
			image.events.onInputUp.add(function() { clickNavTile(i) }, this);
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
	tileData[x][y] = currentNavTile + 5;

	// for(let tileX = 0; tileX < amountOfRows; tileX++){
 //        for(let tileY = 1; tileY < amountOfFields+1; tileY++){

 //            if(map.getTile(tileX, tileY, layer) === null){
 //                tileData[tileX][tileY] = 0;
 //            }else{
 //                tileData[tileX][tileY] = map.getTile(tileX, tileY, layer).index;
 //            }
 //        }
 //    }

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