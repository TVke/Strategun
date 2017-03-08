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

var selectedObject = null;
var selectedSprites = []
var characterSelected = false;
var clickedCount = 0;

var clickedCoord = {
    x: "",
    y: ""
};


var playerAtSetup = 0;
//controleert het plaatsen van de karakters bij het opzetten van het spelbord. Speler kan pas klaar zijn als alles op 0 staat
var setup = {
    0: {
        idForChar: 0, //id te geven aan character om character te identificeren
        soldiers: 10,
        snipers: 4,
        tanks: 4,
        medic: 1,
        bomb: 4,
        flag: 1
    },

    1: {
        idForChar: 24, //de id te geven aan character om character te identificeren
        soldiers: 10,
        snipers: 4,
        tanks: 4,
        medic: 1,
        bomb: 4,
        flag: 1
    }
}