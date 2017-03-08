function Turns() {

}


Turns.prototype.load = function(){
	game.load.image('blueCover', 'assets/grid/blue player.png');
    game.load.image('redCover', 'assets/grid/red player.png');
};

Turns.prototype.end = function(){


	// for(var i = 0; i < cubes.length; i++) {
	//     var cube = cubes[i];
	//     for(var j = 0; j < cube.length; j++) {
	//         display("cube[" + i + "][" + j + "] = " + cube[j]);
	//     }
	// }


	for (let i = 0,ilen = tileData.length; i < ilen; ++i) {
		let horizontal = tileData[i];
		for (let j = 0,jlen = horizontal.length; j < jlen; ++j) {
			console.log(tileData[i][j]);
			// if(tileData[i][j]){
			//
			// }
		}
	}

}

Turns.prototype.startNewTurn = function(){
	if(playerAtSetup === 0){
		playerAtSetup = 1;
	}
	else if(playerAtSetup === 1){
		playerAtSetup = 0;
	}
}
