function create() 
{
    buttonEndTurn = game.add.button(10, 10, 'buttonEndTurn', endTurn);
    buttonStartTurn = game.add.button(300, 10, 'buttonStartTurn', startTurn);
    
    buttonEndText = game.add.text(10, 50, 'End turn', { fill: '#ffffff' });
    buttonStartText = game.add.text(300, 50, 'Start turn', { fill: '#ffffff' });
    
    playerTurnText = game.add.text(game.world.centerX, game.world.centerY - 50, 'Its your turn:', { fill: '#ffffff' });
    
    buttonEndTurn.visible = false;
}

var players = ['blue', 'red'];
var textTurn = '';

function endTurn()
{
    buttonEndTurn.visible = false;
	
	setTimeout(transitionTurn, 2000);
}

function startTurn()
{
    buttonStartTurn.visible = false;
    
    swapPlayer(players);
    
    if(textTurn !== '')
    {
        textTurn.text = players[1];
    }
    else
    {
        textTurn = game.add.text(game.world.centerX, game.world.centerY, players[1], { fill: '#ff0000' });
    }
	// zoom map in
	// maak pionnen van huidige speler herkenbaar
	setTimeout(function(){ buttonEndTurn.visible = true; }, 2000);
}

function transitionTurn()
{
    game.input.enabled = false;
    buttonEndTurn.visible = false;
	// alle pionnen bedekt
	// zoom uit
	// visualeer move van speler
	buttonStartTurn.visible = true;
	setTimeout(function(){ game.input.enabled = true; }, 4000);
}

function swapPlayer(array)
{
	var temp = array[0];
	array[0] = array[1];
	array[1] = temp;
}