function Turns() {

}


Turns.prototype.load = function(){
	game.load.image('blueCover', 'assets/grid/blue player.png');
    game.load.image('redCover', 'assets/grid/red player.png');
};
Turns.showEndTurn = function(){
	console.log("end");
}
Turns.end = function(){
	for (let i = 0,ilen = tileData.length; i < ilen; ++i) {
		let horizontal = tileData[i];
		for (let j = 0,jlen = horizontal.length; j < jlen; ++j) {
			if( tileData[i][j] instanceof Character){
				if(j<10){
					game.add.sprite(i*tileSize,j*tileSize,'blueCover');
				}
				else if(j>=10){
					tileData[i][j].sprite.loadTexture('redCover');
				}
			}
		}
	}
	Character.destroySelected();
	Turns.switchPlayer();

	endTurnSound = game.add.audio('end_turn');
    endTurnSound.play();
}

Turns.switchPlayer = function(){
	Menu.emptyNav();

	// if(!menuElement.querySelector("figure.heart")){
    //     let heartFig = document.createElement('figure');
    //     let heartImg = document.createElement('img');
    //     let heartData = document.createElement('figcaption');
    //     heartFig.className = "heart";
    //     heartImg.src = "assets/sprites/heart.png";
    //     heartImg.alt = "hart met "+value+" in";
    //     heartData.innerHTML = value;
    //     heartFig.appendChild(heartImg);
    //     heartFig.appendChild(heartData);
    //     menuElement.appendChild(heartFig);
    // }
    // else{
    //     menuElement.querySelector(".heart>figcaption").innerHTML = value;
    // }
}
Turns.startNewTurn = function(){
	if(playerAtSetup === 0){
		playerAtSetup = 1;
	}
	else if(playerAtSetup === 1){
		playerAtSetup = 0;
	}
	menuElement.
	startTurnSound = game.add.audio('start_turn');
	startTurnSound.play();
}
