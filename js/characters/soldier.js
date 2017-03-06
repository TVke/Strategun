function Soldier(){
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


Soldier.prototype.select = function(){

}

Soldier.prototype.move = function(){
    
}

Soldier.prototype.attack = function(){
    
}