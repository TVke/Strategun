

function Tile(game){
  this.game = game;
}

Tile.prototype.load = function(){
  this.game.stage.backgroundColor = '#efefef';

  this.game.load.image('red','assets/grid/red laser.png');
  this.game.load.image('blue','assets/grid/blue laser.png');
}

Tile.prototype.highlight = function(position, range){
  
}
