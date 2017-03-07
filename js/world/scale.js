function Scale(game){
  this.game = game;
}

Scale.prototype.load = function(){
  game.load.image('scaleIn','assets/grid/loop plus.png');
  game.load.image('scaleOut','assets/grid/loop min.png');
}
