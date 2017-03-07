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

  game.load.audio('tankSelect', 'assets/sounds/tank_select.mp3');
  game.load.audio('tankHurt', 'assets/sounds/tank_hurt.mp3');
  game.load.audio('tankDeath', 'assets/sounds/tank_death.mp3')
  game.load.audio('tankPunch', 'assets/sounds/tank_punch.mp3');
}
