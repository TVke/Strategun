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
	BOMB: 1,
	FLAG: 2,
	MEDIC: 3,
	SNIPER: 4,
	SOLDIER: 5,
	TANK: 6,
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

var idForChar = 0;

var playerAtSetup = 0;
//controleert het plaatsen van de karakters bij het opzetten van het spelbord. Speler kan pas klaar zijn als alles op 0 staat
var setup = {
    flag: 1,
    bombs: 1, //TODO: switch later nog naar 5 terug
    // medics: 1,
    // snipers: 1, //TODO: terug naar 2 zetten later
    // tanks: 4,
    // soldiers: 10,

}
