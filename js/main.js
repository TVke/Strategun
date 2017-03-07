/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/phaser_box2d.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser/typescript/p2.d.ts" />

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
	Object.keys(characters).forEach(function(character) {
		characters[character].load();
	})
}

function create() {
	gameObjects.world.makeGrid();
}

function update() {
	gameObjects.world.moveMap();
}
