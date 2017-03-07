function Scale(game){
  this.game = game;
}

Scale.prototype.load = function(){
  this.game.load.image('bombGlow','assets/grid/mijn gloed.png');
}

Tile.prototype.invisibleTiles = function() {

}

Tile.prototype.highlight = function(position, range){

}
