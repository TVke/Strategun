var characterItems = document.querySelectorAll('nav a');
var selectedChar;
function Menu(){

}

Menu.prototype.load = function(){
    this.placeChar();
    for(let menuItem = 0,ilen = characterItems.length; menuItem < ilen; ++menuItem){
        context = this;
        (function(place){
            characterItems[place].addEventListener("click", function(){context.SelectChar(event,place)}, false);
        })(menuItem)
    }
};

Menu.prototype.SelectChar = function(event,arrayPos){
    event.preventDefault();
    toggleSelectClass(arrayPos);
    selectedChar = characterItems[arrayPos];
}

Menu.prototype.placeChar = function(){
    context = this;
    game.input.onTap.add(function (pointer, event) {
        tileX = tileLayer.getTileX(this.game.camera.x + pointer.x);
        tileY = tileLayer.getTileY(this.game.camera.y + pointer.y);
        // check wall or oil or other char
        console.log("x: "+tileX+" y: "+tileY);
        if (true){
            context.putCharacter(selectedChar,tileX,tileY);
        }
    });

}
Menu.prototype.putCharacter = function(character, tileX, tileY, onLoad){
    console.log(character, tileX, tileY);
    // selectedTile = tileData[tileX][tileY];
    // 	if (Setup.handleCharacterLimit(selectedChar) && Setup.sideControl(playerAtSetup, tileX, tileY)) {
    // 		tileData[tileX][tileY] = Character.makeCharacter(character, setup[playerAtSetup].idForChar, playerAtSetup);
    // 		game.add.image(tileX * tileSize, tileY * tileSize, this.charToImage(character));
    // 		selectedChar = null;
    // 	} else if(onLoad){
    // 		tileData[tileX][tileY] = Character.makeCharacter(character, setup[playerAtSetup].idForChar, playerAtSetup);
    // 		game.add.image(tileX * tileSize, tileY * tileSize, this.charToImage(character));
    // 		selectedChar = null;
    // 	}
}
function toggleSelectClass(pos){
    for(let menuItem = 0,ilen = characterItems.length; menuItem < ilen; ++menuItem){
        if(characterItems[menuItem].className !== ""){
            characterItems[menuItem].removeAttribute("class");
        }
    }
    characterItems[pos].classList.add("selected");
}
