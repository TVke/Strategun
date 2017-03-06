

function Tiles(game){
  game.stage.backgroundColor = '#efefef';
}

Tiles.prototype.load = function(){
  game.load.image('red','/assets/grid/red laser.png');
  game.load.image('blue','/assets/grid/blue laser.png');
}

Tiles.prototype.highlight = function(position, range){

}
