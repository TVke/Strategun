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
            let charId;
            switch (selectedChar.querySelector("figure figcaption").innerHTML) {
                case "Soldaat":
                    charId = MenuItems.SOLDIER;
                    break;
                case "Radar":
                    charId = MenuItems.FLAG;
                    break;
                case "Mijn":
                    charId = MenuItems.BOMB;
                    break;
                case "Dokter":
                    charId = MenuItems.MEDIC;
                    break;
                case "Sniper":
                    charId = MenuItems.SNIPER;
                    break;
                case "Tank":
                    charId = MenuItems.TANK;
                    break;
            }
            Tile.putCharacter(charId,tileX,tileY);
        }
    });

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
