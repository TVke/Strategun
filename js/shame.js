var players = ['blue', 'red'];
var textTurn = '';

function endTurn()
{
    console.log('ending turn');

    //buttonEndTurn.visible = false;
	
	//setTimeout(transitionTurn, 2000);
}

function startTurn()
{
    console.log('starting turn');

 //    buttonStartTurn.visible = false;
    
 //    swapPlayer(players);
    
 //    if(textTurn !== '')
 //    {
 //        textTurn.text = players[1];
 //    }
 //    else
 //    {
 //        textTurn = game.add.text(game.world.centerX + 100, 0, players[0], { fill: '#ff0000' });
 //    }
	// // zoom map in
	// // maak pionnen van huidige speler herkenbaar
	// //setTimeout(function(){ buttonEndTurn.visible = true; }, 2000);
}

function transitionTurn()
{
    //game.input.enabled = false;
    buttonEndTurn.visible = false;
	// alle pionnen bedekt
	// zoom uit
	// visualeer move van speler
	buttonStartTurn.visible = true;
	//setTimeout(function(){ game.input.enabled = true; }, 4000);
}

function swapPlayer(array)
{
	var temp = array[0];
	array[0] = array[1];
	array[1] = temp;
}

var

function shoot(shooter, target)
{
    shooterPosX = shooter.world.x;
    shooterPosY = shooter.world.y;
    
    targetPosX = target.world.x;
    targetPosY = target.world.y;
    
    differenceX = targetPosX - shooterPosX;
    differenceY = targetPosY - shooterPosY;
    
    if((differenceX <= 100 && shooterPosY == targetPosY) || (differenceY <= 100 && shooterPosX == targetPosX))
    {
        //targetHealth -= damageDone;
        textDisplay.text = 'MY BABY SHOT ME DOWN';
    }
    else
    {
        textDisplay.text = 'NOT IN RANGE';
    }
}