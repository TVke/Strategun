function Medic(id, player){
    this.id = id;
    this.assetId = 4
    this.player = player;
    this.attack = -4;
    this.health = 3;
    this.range = [3, 3];
    this.type = "medic";
    this.icon = "";
    this.asset = "";
}

Medic.prototype = Object.create(Character.prototype);
Medic.prototype.constructor = Character;

Medic.load = function(){
    
}