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

}