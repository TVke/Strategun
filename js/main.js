/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/phaser_box2d.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser/typescript/p2.d.ts" />

var game = new Phaser.Game(tileSize * amountOfRows, tileSize * amountOfFields, Phaser.CANVAS, '',
 {preload:preload,create:create,update:update});

var gameObjects = {
	world: new World(game),
	tile: new Tile(game),
	menu: new Menu(),
    turns: new Turns(),
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

	game.load.image('buttonStartTurn', 'assets/sprites/buttonStartTurn.png');
	game.load.image('buttonEndTurn', 'assets/sprites/buttonEndTurn.png');
	game.load.image('heart', 'assets/sprites/heart.png');
	game.load.audio('move_piece', 'assets/sounds/move_piece.mp3');
	game.load.audio('end_turn', 'assets/sounds/end_turn.mp3');
	game.load.audio('start_turn', 'assets/sounds/start_turn.mp3');
	game.load.spritesheet('heartSpritesheet', 'assets/sprites/heart_spritesheet.png', 46, 46);
}

function create() {
	gameObjects.world.metal();
	gameObjects.world.makeGrid();
	gameObjects.world.makeMap();

	gameObjects.tile.loadChar();

	characters.character.events();
}

function update() {
	gameObjects.world.moveMap();
}
