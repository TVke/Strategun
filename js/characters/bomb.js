function Bomb(id, player, game) {
    this.id = id;
    this.assetId = 5;
    this.player = player;
    this.attack = 3;
    this.health = 3;
    this.range = [6, 6];
    this.type = "bomb";
    this.icon = "";
    this.asset = "";
}

Bomb.prototype = Object.create(Character.prototype);
Bomb.prototype.constructor = Character;

Bomb.load = function () {
  game.load.image('bomb','assets/grid/mijn.png');
  game.load.image('bombGlow','assets/grid/mijn gloed.png');
  
}
