/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/phaser_box2d.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser/typescript/p2.d.ts" />

//const width = 0;
//const height = 0;
//scaleRatio = window.devicePixelRatio / 3;

<<<<<<< HEAD
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, '', {
=======
var game = new Phaser.Game(window.innerWidth, window.innerHeight / window.devicePixelRatio, Phaser.CANVAS, '', {
>>>>>>> 54ad50594d1e5fa2f6df2776af78ec5b76f3cf8a
	preload: preload,
	create: create,
	update: update
});

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
