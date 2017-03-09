function Soldier(id, player, position, sprite){
    this.id = id;
    this.assetId = 4;
    this.player = player;
    this.attack = 2;
    this.health = 5;
    this.maxHealth = 5;
    this.range = 2;
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

  game.load.image('laser', 'assets/grid/laser.png');
  game.load.image('laser_horizontal', 'assets/grid/laser_horizontal.png')

  // game.load.audio('soldierSelect', 'assets/sounds/soldier_fire.mp3');
  // game.load.audio('soldierHurt', 'assets/sounds/soldier_hurt.mp3');
  // game.load.audio('soldierDeath', 'assets/sounds/soldier_death.mp3');
  // game.load.audio('soldierFire', 'assets/sounds/soldier_fire.mp3');
}

Soldier.attackAnimation = function(source, target){
  laserSprite = "laser";

  if(target.tilePosition.y === source.tilePosition.y){
    laserSprite = "laser_horizontal";
  }

  laser = game.add.sprite(source.tilePosition.x*44, source.tilePosition.y*44, laserSprite);
  shoot = game.add.tween(laser);

  
  shoot.to({x: target.tilePosition.x*44, y: target.tilePosition.y*44}, 300);
  shoot.start();
  shoot.onComplete.add(function(){
    laser.destroy();
    if(target.health <= 0){
        target.sprite.destroy();
        if(tileData[tileX][tileY] instanceof Flag){
          Turns.endGame(tileData[tileX][tileY].player);
        }
        tileData[tileX][tileY] = 0;

        
    }
  }, this)
}