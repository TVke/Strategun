

function Menu(){

}

/**
 * TODO: Als character geselecteerd word toggle class om selectie aan te tonen
 */

Menu.prototype.load = function(){
    var charMenu = document.getElementById("characters");
    var characterItems = charMenu.children;

    for(let menuItem = 0; menuItem < characterItems.length; menuItem++){
        characterItems[menuItem].addEventListener("click", this.placeOnTile, false);
    }
}

Menu.prototype.placeOnTile = function(event){
    selectedChar = e.target.id;

    tileX = tileLayer.getTileX(pointer.x);
		tileY = tileLayer.getTileY(pointer.y);

		if (selectedChar !== null) {
			context.putCharacter(selectedChar, tileX, tileY);
		}


    game.input.onTap.add(function (pointer, event) {
		

	});
}