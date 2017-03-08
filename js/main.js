/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/phaser_box2d.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser/typescript/p2.d.ts" />

var game = new Phaser.Game(window.innerWidth, window.innerHeight - document.getElementsByTagName('nav')[0].offsetHeight, Phaser.CANVAS, '',
 {preload:preload,create:create,update:update});

var gameObjects = {
	world: new World(game),
	tile: new Tile(game),
	menu: new Menu(),
}

var characters = {
    character: Character,
	bomb: Bomb,
	flag: Flag,
	medic: Medic,
	sniper: Sniper,
	soldier: Soldier,
	tank: Tank,
}

function preload() {
	Object.keys(gameObjects).forEach(function(objects) {
		gameObjects[objects].load();
	})
	Object.keys(characters).forEach(function(character) {
		characters[character].load();
	})

	// trials turn skipping
	game.load.image('buttonStartTurn', 'assets/sprites/buttonStartTurn.png');
	game.load.image('buttonEndTurn', 'assets/sprites/buttonEndTurn.png');
}

function create() {
	gameObjects.world.makeGrid();
	gameObjects.world.makeMap();

	gameObjects.tile.loadChar();

	characters.character.events();
}

function update() {
	gameObjects.world.moveMap();
}
