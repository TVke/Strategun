function Soldier(id, player, position, sprite) {
  this.id = id;
  this.assetId = MenuItems.SOLDIER;
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

Soldier.load = function () {
  game.load.image('soldierOut', 'assets/grid/soldaat out.png');
  game.load.image('bsoldierInWhite', 'assets/grid/bsoldaat in white.png');
  game.load.image('bsoldierInBlack', 'assets/grid/bsoldaat in black.png');
  game.load.image('rsoldierInWhite', 'assets/grid/rsoldaat in white.png');
  game.load.image('rsoldierInBlack', 'assets/grid/rsoldaat in black.png');

  game.load.image('laser', 'assets/grid/laser.png');
  game.load.image('laser_horizontal', 'assets/grid/laser_horizontal.png')
}

Soldier.attackAnimation = function (source, target) {

  laserSprite = "laser";

  if (target.tilePosition.y === source.tilePosition.y) {
    laserSprite = "laser_horizontal";
  }

  if (source.type === "bomb") {
    glow = game.add.sprite(source.tilePosition.x * tileSize, source.tilePosition.y * tileSize, 'rbombGlow');
    shoot = game.add.tween(glow);
  } else {
    laser = game.add.sprite(source.tilePosition.x * tileSize, source.tilePosition.y * tileSize, laserSprite);
    shoot = game.add.tween(laser);
  }


  fireAudio = game.add.audio('fire');
  deathAudio = game.add.audio('death');
  fireAudio.play();

  shoot.to({
    x: target.tilePosition.x * tileSize,
    y: target.tilePosition.y * tileSize
  }, 300);
  shoot.start();

  shoot.onComplete.add(function () {
    if (target.health < 1) {
      target.sprite.destroy();
      deathAudio.play();

      if (tileData[tileX][tileY] instanceof Flag || !Character.checkMoveableExist()) {
        Turns.endGame(tileData[tileX][tileY].player);
      }
      
      tileData[tileX][tileY] = 0;
    }

    if (target.type === "bomb" || source.type === "bomb") {
      tileData[target.tilePosition.x][target.tilePosition.y] = 0;
      tileData[source.tilePosition.x][source.tilePosition.y] = 0;

      deathAudio.play();

      target.sprite.destroy();
      source.sprite.destroy();

      laser.destroy();
      glow.destroy();
    }

    hitAudio = game.add.audio('fire_hit');
    hitAudio.play();

    laser.destroy();
  }, this)
}