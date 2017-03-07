function Flag(id, player){
    this.id = id;
    this.assetId = 6;
    this.player = player;
    this.attack = 0;
    this.health = 1;
    this.range = 0;
    this.type = "flag";
    this.icon = "";
    this.asset = "";
}

Flag.prototype = Object.create(Character.prototype);
Flag.prototype.constructor = Character;

Flag.load = function(){
  game.load.image('flag','assets/grid/antenne.png');
}
