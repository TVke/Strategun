function Tank(id, player, position, sprite){
    this.id = id;
    this.assetId = MenuItems.TANK;
    this.player = player;
    this.attack = 3;
    this.health = 10;
    this.maxHealth = 10;
    this.range = 1;
    this.type = "tank";
    this.icon = "";
    this.asset = "";
    this.moveable = true;
}

Tank.prototype = Object.create(Character.prototype);
Tank.prototype.constructor = Character;

Tank.load = function(){
  game.load.image('tankOut','assets/grid/tank soldaat out.png');
  game.load.image('btankInWhite','assets/grid/btank soldaat in white.png');
  game.load.image('btankInBlack','assets/grid/btank soldaat in black.png');
  game.load.image('rtankInWhite','assets/grid/rtank soldaat in white.png');
  game.load.image('rtankInBlack','assets/grid/rtank soldaat in black.png');

  // game.load.audio('tankSelect', 'assets/sounds/tank_select.mp3');
  // game.load.audio('tankHurt', 'assets/sounds/tank_hurt.mp3');
  // game.load.audio('tankDeath', 'assets/sounds/tank_death.mp3')
  // game.load.audio('tankPunch', 'assets/sounds/tank_punch.mp3');
}