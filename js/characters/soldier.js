function Soldier(id, player, position, sprite){
    this.id = id;
    this.assetId = 4;
    this.player = player;
    this.attack = 2;
    this.health = 5;
    this.range = 4;
    this.tilePosition = position;
    this.sprite = sprite;
    this.type = "soldier";
    this.icon = "assets/images/soldier.png";
    this.asset = "";
    this.moveable = true;
}

Soldier.prototype = Object.create(Character.prototype);
Soldier.prototype.constructor = Character;

Soldier.load = function(){
  game.load.image('soldierOut','assets/grid/soldaat out.png');
  game.load.image('bsoldierInWhite','assets/grid/bsoldaat in white.png');
  game.load.image('bsoldierInBlack','assets/grid/bsoldaat in black.png');
  game.load.image('rsoldierInWhite','assets/grid/rsoldaat in white.png');
  game.load.image('rsoldierInBlack','assets/grid/rsoldaat in black.png');

  game.load.audio('soldierSelect', 'assets/sounds/soldier_fire.mp3');
  game.load.audio('soldierHurt', 'assets/sounds/soldier_hurt.mp3');
  game.load.audio('soldierDeath', 'assets/sounds/soldier_death.mp3');
  game.load.audio('soldierFire', 'assets/sounds/soldier_fire.mp3');
}

Soldier.prototype.select = function(){

}

Soldier.prototype.move = function(){

}

Soldier.prototype.attack = function(){

}