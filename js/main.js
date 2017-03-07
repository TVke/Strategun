/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/phaser_box2d.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser/typescript/p2.d.ts" />

var gameObjects = {
	world: new World(game),
	tile: new Tile(game),
}

function preload() {
	Object.keys(gameObjects).forEach(function (object) {
		gameObjects[object].load();
	});


}

function create() {
	gameObjects.world.makeGrid();
}

function update() {
	gameObjects.world.moveMap();
}
