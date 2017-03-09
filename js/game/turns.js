function Turns() {

}


Turns.prototype.load = function(){
	game.load.image('blueCover', 'assets/grid/blue player.png');
    game.load.image('redCover', 'assets/grid/red player.png');
};

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
	//context.startNewTurn();
	Menu.addElement("p","test");

}

Turns.startNewTurn = function(){
	if(playerAtSetup === 0){
		playerAtSetup = 1;
	}
	else if(playerAtSetup === 1){
		playerAtSetup = 0;
	}
}
