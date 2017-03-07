function Tile(game){
  this.game = game;
}

Tile.prototype.load = function(){
	for (let i = 0; i < 25; ++i) {
		for (let j = 0; j < 50; ++j) {
			let graphics = game.add.graphics(0, 0);
			graphics.beginFill(0xFFFFFF);
			graphics.drawRect(tileSize * j, tileSize * i, tileSize, tileSize);
			graphics.inputEnabled = true;
			graphics.events.onInputOver.add(over, this);
			graphics.events.onInputOut.add(out, this);
		}
	}
}

Tile.prototype.invisibleTiles = function() {

}

Tile.prototype.highlight = function(position, range){

}

function over(item) {
	item.alpha = 0;
}
function out(item) {
	item.alpha = 1;
}