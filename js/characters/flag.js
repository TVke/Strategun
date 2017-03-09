function Flag(id, player, position, sprite){
    this.id = id;
    this.assetId = 6;
    this.player = player;
    this.attack = 0;
    this.health = 15;
    this.maxHealth = 0;
    this.range = 0;
    this.type = "flag";
    this.tilePosition = position;
    this.icon = "";
    this.sprite = sprite;
    this.asset = "";
    this.moveable = false;
}

Flag.prototype = Object.create(Character.prototype);
Flag.prototype.constructor = Character;

Flag.load = function(){
  game.load.image('bflag','assets/grid/bradar.png');
  game.load.image('rflag','assets/grid/rradar.png');
}
