/**
 * 
 * Setup.js
 * 
 * Het bestand dat het plaatsen van de soldaten handeld een voor een voor elke kant
 */


function Setup() {

}


Setup.prototype.changePlayer = function () {
    playerAtSetup++;
}

Setup.sideControl = function(player, x, y){
    if(player === 0){
        if(y > amountOfRows/2){
            return false;
        }
    }else if(player === 1){
        if(y < amountOfRows/2){
            return false;
        }
    }else{
        return true;
    }
}

Setup.prototype.gameStart = function(){

}

Setup.placementComplete = function(){
    
    var context = this;
    var empty = true;

    Object.keys(setup[playerAtSetup]).forEach(function(chars){
        if(chars !== 0){
            empty = false;
        }
    });
    
    if(playerAtSetup === 1){
        context.gameStart();
    }else{
        playerAtSetup = 1;
    }

}

Setup.handleCharacterLimit = function (character) {
    handlesIt = true;

    switch (character) {
        case MenuItems.BOMB:
            if (setup[playerAtSetup].bomb !== 0) {
                setup[playerAtSetup].bomb--;
            }else{
                handlesIt = false;
            }
            break;
        case MenuItems.FLAG:
            if (setup[playerAtSetup].flag !== 0) {
                setup[playerAtSetup].flag--;
            }else{
                handlesIt = false;
            }
            break;
        case MenuItems.MEDIC:
            if (setup[playerAtSetup].medic !== 0) {
                setup[playerAtSetup].medic--;
            }else{
                handlesIt = false;
            }
            break;
        case MenuItems.SNIPER:
            if (setup[playerAtSetup].snipers !== 0) {
                setup[playerAtSetup].snipers--;
            }else{
                handlesIt = false;
            }
            break;
        case MenuItems.SOLDIER:
            if (setup[playerAtSetup].soldiers !== 0) {
                setup[playerAtSetup].soldiers--;
            }else{
                handlesIt = false;
            }
            break;
        case MenuItems.TANK:
            if (setup[playerAtSetup].tanks !== 0) {
                setup[playerAtSetup].tanks--;
            }else{
                handlesIt = false;
            }
            break;
        default:
            handlesIt = false;
            break;
    }

    

    console.log(setup[playerAtSetup]);
    return handlesIt;
}