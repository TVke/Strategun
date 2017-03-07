/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/phaser_box2d.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser/typescript/p2.d.ts" />

//const width = 0;
//const height = 0;
//scaleRatio = window.devicePixelRatio / 3;

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, '', {
	preload: preload,
	create: create,
	update: update
});

var gameObjects = {
	world: new World(game),
	tile: new Tile(game),
}

var characters = {
	bomb: Bomb,
	flag: Flag,
	medic: Medic,
	sniper: Sniper,
	soldier: Soldier,
	tank: Tank,
}

function preload() {
	Object.keys(gameObjects).forEach(function (object) {
		gameObjects[object].load();
	});

	Object.keys(characters).forEach(function(character) {
		characters[character].load();
	})
}

function create() {
	gameObjects.world.makeGrid();
	gameObjects.world.makeMap();
}

function update() {
	gameObjects.world.moveMap();
}
