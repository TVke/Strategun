var tileData = null;
var tileMap = null;
var tileLayer = null;
var neighbours = null;

var gameStarted = false;
var selectedChar = null;
var selectedCharMov = {
    charObj: null,
    x: null,
    y: null
};

MenuItems = {
	BOMB: 0,
	FLAG: 1,
	MEDIC: 2,
	SNIPER: 3,
	SOLDIER: 4,
	TANK: 5,
};

var selectedObject = null;
var characterMode = "";
var selectedSprites = []
var characterSelected = false;
var clickedCount = 1;
var actionPerformed = false;

const amountOfFields = 10;
const tileSize = 44;

var clickedCoord = {
    x: "",
    y: ""
};

// vincent dit is voor character
var idForChar = 0;

var playerAtSetup = 0;
//controleert het plaatsen van de karakters bij het opzetten van het spelbord. Speler kan pas klaar zijn als alles op 0 staat
var setup = {
    flag: 1,
    bombs: 5,
    medics: 1,
    snipers: 2,
    tanks: 4,
    soldiers: 10,

}
