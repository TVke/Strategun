function Sniper(id, player){
    this.id = id;
    this.assetId = 1;
    this.player = player;
    this.attack = 3;
    this.health = 3;
    this.range = 41;
    this.type = "sniper";
    this.icon = "";
    this.asset = "";
}

Sniper.prototype = Object.create(Character.prototype);
Sniper.prototype.constructor = Character;

Sniper.load = function(){
  game.load.image('bsniperOut','assets/grid/bsniper out.png');
  game.load.image('bsniperIn','assets/grid/bsniper in.png');
  game.load.image('rsniperOut','assets/grid/rsniper out.png');
  game.load.image('rsniperIn','assets/grid/rsniper in.png');

  game.load.audio('sniperSelect', 'assets/sounds/sniper_select.mp3');
  game.load.audio('sniperHurt', 'assets/sounds/sniper_hurt.mp3');
  game.load.audio('sniperDeath', 'assets/sounds/sniper_hurt.mp3');
  game.load.audio('sniperFire', 'assets/sounds/sniper_fire.mp3');
}
