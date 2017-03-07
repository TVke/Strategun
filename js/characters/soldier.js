function Soldier(id, player){
    this.id = id;
    this.assetId = 2;
    this.player = player;
    this.attack = 2;
    this.health = 5;
    this.range = 2;
    this.position = 0;
    this.type = "soldier";
    this.icon = "assets/images/soldier.png";
    this.asset = "";
}

Soldier.prototype = Object.create(Character.prototype);
Soldier.prototype.constructor = Character;

Soldier.load = function(){
  game.load.image('soldierOut','assets/grid/soldaat out.png');
  game.load.image('soldierInWhite','assets/grid/soldaat in white.png');
  game.load.image('soldierInBlack','assets/grid/soldaat in black.png');
}

Soldier.prototype.select = function(){

}

Soldier.prototype.move = function(){

}

Soldier.prototype.attack = function(){

}
