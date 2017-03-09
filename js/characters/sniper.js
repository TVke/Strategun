function Sniper(id, player, position, sprite){
    this.id = id;
    this.assetId = MenuItems.SNIPER;
    this.player = player;
    this.attack = 3;
    this.health = 3;
    this.maxHealth = 3;
    this.range = 41;
    this.tilePosition = position;
    this.sprite = sprite;
    this.type = "sniper";
    this.icon = "";
    this.asset = "";
    this.moveable = true;
}

Sniper.prototype = Object.create(Character.prototype);
Sniper.prototype.constructor = Character;

Sniper.load = function(){
  game.load.image('sniperOut','assets/grid/sniper out.png');
  game.load.image('bsniperIn','assets/grid/bsniper in.png');
  game.load.image('rsniperIn','assets/grid/rsniper in.png');

  // game.load.audio('sniperSelect', 'assets/sounds/sniper_select.mp3');
  // game.load.audio('sniperHurt', 'assets/sounds/sniper_hurt.mp3');
  // game.load.audio('sniperDeath', 'assets/sounds/sniper_hurt.mp3');
  // game.load.audio('sniperFire', 'assets/sounds/sniper_fire.mp3');
}