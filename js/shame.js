var players = ['blue', 'red'];
var textTurn = '';

function endTurn()
{
    console.log('ending turn');

    buttonEndTurn.visible = false;
	
	//setTimeout(transitionTurn, 2000);
}

function startTurn()
{
    console.log('starting turn');

    buttonStartTurn.visible = false;
    
    swapPlayer(players);
    
    if(textTurn !== '')
    {
        textTurn.text = players[1];
    }
    else
    {
        textTurn = game.add.text(game.world.width - 150, 0, players[0], { fill: '#ff0000' });
    }
	// zoom map in
	// maak pionnen van huidige speler herkenbaar
	//setTimeout(function(){ buttonEndTurn.visible = true; }, 2000);
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

// shoot(selectedObject, targetedObject);
// selected = soldier, targeted = sniper
function shoot(shooter, target)
{
    shooterPosX = shooter.world.x;
    shooterPosY = shooter.world.y;
    
    targetPosX = target.world.x;
    targetPosY = target.world.y;
    
    differenceX = targetPosX - shooterPosX;
    differenceY = targetPosY - shooterPosY;
    
    if((differenceX <= shooter.range && shooterPosY == targetPosY) || (differenceY <= shooter.range && shooterPosX == targetPosX))
    {
        target.health -= shooter.attack;

        if(target.health <= 0)
        {
        	killUnit(target);
        }

        console.log('MY BABY SHOT ME DOWN');
    }
    else
    {
        console.log('NOT IN RANGE');
    }
}

/*
function getHeart(unit)
{
	health = unit.health;

	heartSpritesheet = game.add.sprite(game.width.centerX, 0, 'heartSpritesheet');
	heartSpritesheet.frame = health;
	
	text = game.add.text(0, 0, health, { font: '20px Arial', fill: '#000000', wordWrap: true, wordWrapWidth: heartSprite.width, align: 'center' });
	text.fontWeight = 'bold';
	text.anchor.set(0.5);
	text.x = Math.floor(heartSprite.x + (heartSprite.width/2));
	text.y = Math.floor(heartSprite.y + (heartSprite.height/2));

	Menu.addElement('p', heartSprite);
	Menu.addElement('p', text);
}
*/