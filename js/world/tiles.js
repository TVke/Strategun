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
		}
	}

    let tileSelectorBackground = game.add.graphics(0, 0);
    tileSelectorBackground.beginFill(0x000000);
    tileSelectorBackground.drawRect(0, 0, tileSize * 50, tileSize);

	for (let i = 0; i < 6; ++i) {
		let invisibleTile = game.add.graphics(0, 0);
		invisibleTile.beginFill(0x000000);
		invisibleTile.drawRect(tileSize, tileSize, tileSize, tileSize);
		invisibleTile.inputEnabled = true;
		invisibleTile.events.onInputOver.add(over, this);
		invisibleTile.events.onInputOut.add(out, this);
	}
}

function over(item) {
	item.alpha = 0;
}
function out(item) {
	item.alpha = 1;
}