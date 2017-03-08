

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
    event.preventDefault();
    selectedChar = event.target.id;
    toggleSelectClass(selectedChar);


    tileX = tileLayer.getTileX(pointer.x);
		tileY = tileLayer.getTileY(pointer.y);

		if (selectedChar !== null) {
			context.putCharacter(selectedChar, tileX, tileY);
		}


    game.input.onTap.add(function (pointer, event) {


	});
}
function toggleSelectClass(id){
    document.getElementById(id.toString()).classList.toggle("selected");
}
