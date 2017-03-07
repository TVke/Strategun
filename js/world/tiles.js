let currentNavTile;
let charactersArray = ['bomb', 'flag', 'medic', 'sniper', 'soldier', 'tank'];

function Tile(game){
  this.game = game;
}

Tile.prototype.load = function(){
	for (let i = 0; i < 25; ++i) {
		for (let j = 0; j < 50; ++j) {
			let invisibleTile = game.add.graphics(0, 0);
			invisibleTile.beginFill(0xFFFFFF);
			invisibleTile.drawRect(tileSize * j, tileSize * i + tileSize, tileSize, tileSize);
			invisibleTile.inputEnabled = true;
			invisibleTile.events.onInputOver.add(over, this);
			invisibleTile.events.onInputOut.add(out, this);
			invisibleTile.events.onInputDown.add(clickTile, this);
		}
	}

	for (var i = 0; i < 6; ++i) {
		(function(i) {
			let image = game.add.image(tileSize * i, 0, charactersArray[i])
			image.inputEnabled = true;
			image.events.onInputOver.add(over, this);
			image.events.onInputOut.add(out, this);
			image.events.onInputDown.add(function() { clickNavTile(i) }, this);
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
	if(counter == 0) {
		currentNavTile = 'bomb';
	}
	if(counter == 1) {
		currentNavTile = 'flag';
	}
	if(counter == 2) {
		currentNavTile = 'medic';
	}
	if(counter == 3) {
		currentNavTile = 'sniper';
	}
	if(counter == 4) {
		currentNavTile = 'soldier';
	}
	if(counter == 5) {
		currentNavTile = 'tank';
	}
}

function clickTile() {
	console.log(currentNavTile);

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