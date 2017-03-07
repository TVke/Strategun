function Tank(id, player){
    this.id = id;
    this.assetId = 3;
    this.player = player;
    this.attack = 3;
    this.health = 10;
    this.range = 1;
    this.type = "tank";
    this.icon = "";
    this.asset = "";
}

Tank.prototype = Object.create(Character.prototype);
Tank.prototype.constructor = Character;

Tank.load = function(){
  game.load.image('tankOut','assets/grid/tank soldaat out.png');
  game.load.image('tankInWhite','assets/grid/tank soldaat in white.png');
  game.load.image('tankInBlack','assets/grid/tank soldaat in black.png');
}
