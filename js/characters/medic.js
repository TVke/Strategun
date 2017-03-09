function Medic(id, player, position, sprite){
    this.id = id;
    this.assetId = 4
    this.player = player;
    this.attack = 4;
    this.health = 3;
    this.maxHealth = 3;
    this.range = 3;
    this.tilePosition = position;
    this.sprite = sprite;
    this.type = "medic";
    this.icon = "";
    this.asset = "";
    this.moveable = true;
}

Medic.prototype = Object.create(Character.prototype);
Medic.prototype.constructor = Character;

Medic.load = function(){
    game.load.image('medicOut','assets/grid/dokter out.png');
    game.load.image('bmedicIn','assets/grid/bdokter in.png');
    game.load.image('rmedicIn','assets/grid/rdokter in.png');

    // game.load.audio('medicSelect', 'assets/sounds/medic_select.mp3');
    // game.load.audio('medicHurt', 'assets/sounds/medic_hurt.mp3');
    // game.load.audio('medicDeath', 'assets/sounds/medic_death.mp3');
    // game.load.audio('medicHeal', 'assets/sounds/medic_heal.mp3');
}

Medic.healAnimation = function(source, target){

}