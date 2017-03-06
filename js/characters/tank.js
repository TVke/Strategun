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

Tank.prototype.load = function(){
    
}