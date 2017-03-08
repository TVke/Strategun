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
        selectedTile = tileData[tileX][tileY];
        if (selectedTile === 0 && selectedChar !== null){
            context.putCharacter(selectedChar,tileX,tileY);
        }
    });

}
Menu.prototype.putCharacter = function(character, tileX, tileY, onLoad){
    //selectedTile = tileData[tileX][tileY];
    console.log(Tile);
    Character.makeCharacter(character, setup[playerAtSetup].idForChar, playerAtSetup);
	// if (Setup.handleCharacterLimit(character) && Setup.sideControl(playerAtSetup, tileX, tileY)) {
	// 	tileData[tileX][tileY] = Character.makeCharacter(character, setup[playerAtSetup].idForChar, playerAtSetup);
	// 	game.add.image(tileX * tileSize, tileY * tileSize, this.charToImage(character));
	// 	selectedChar = null;
    //     clearSelection();
	// } else if(onLoad){
	// 	tileData[tileX][tileY] = Character.makeCharacter(character, setup[playerAtSetup].idForChar, playerAtSetup);
	// 	game.add.image(tileX * tileSize, tileY * tileSize, this.charToImage(character));
	// 	selectedChar = null;
    //     clearSelection();
	// }
}
function clearSelection(){
    for(let menuItem = 0,ilen = characterItems.length; menuItem < ilen; ++menuItem){
        if(characterItems[menuItem].className !== ""){
            characterItems[menuItem].removeAttribute("class");
        }
    }
}
function toggleSelectClass(pos){
    clearSelection();
    characterItems[pos].classList.add("selected");
}
