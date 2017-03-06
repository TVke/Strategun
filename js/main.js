/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/phaser_box2d.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser/typescript/p2.d.ts" />

//const width = 0;
//const height = 0;
//scaleRatio = window.devicePixelRatio / 3;

let game = new Phaser.Game(window.innerWidth, window.innerHeight,Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update
});


function preload(){
    let gameObjects = [
        new World(game),
        new Tiles(game),
    ];

    for(let object = 0; object < gameObjects.length; object++){
        gameObjects[object].load();
    }
}

const tileSize = 44;
const amountOfFields = 25;
const laserSize = 2;
var lasers;

function create(){
	game.world.resize((amountOfFields * 2) * tileSize, amountOfFields * tileSize);

	lasers = game.add.group();

	for (let i = 1; i < amountOfFields; ++i){
		let blueVerticle = game.add.tileSprite(i * tileSize, 0, laserSize, game.world.height, 'blue');
		let blueHorizontal = game.add.tileSprite(0, i * tileSize, game.world.width / 2, laserSize, 'blue');
		let redVerticle = game.add.tileSprite(game.world.width / 2 + i * tileSize, 0, laserSize, game.world.height, 'red');
		let redHorizontal = game.add.tileSprite(game.world.width / 2, i * tileSize, game.world.width / 2, laserSize, 'red');
		lasers.add(blueVerticle);
		lasers.add(blueHorizontal);
		lasers.add(redVerticle);
		lasers.add(redHorizontal);
	}
	var  bBRV = game.add.tileSprite(0, 0, 1, game.world.height, 'blue');
	var  bBLH = game.add.tileSprite(0, 0, game.world.width / 2, 1, 'blue');
	var  bBRT = game.add.tileSprite(game.world.width / 2 - 1, 0, 1, game.world.height, 'blue');
	var  bBLB = game.add.tileSprite(0, game.world.height-1, game.world.width / 2, 1, 'blue');

	var  rBRV = game.add.tileSprite(game.world.width / 2, 0, 1, game.world.height, 'red');
	var  rBLH = game.add.tileSprite(game.world.width / 2, 0, game.world.width / 2, 1, 'red');
	var  rBRT = game.add.tileSprite(game.world.width - 1, 0, 1, game.world.height, 'red');
	var  rBLB = game.add.tileSprite(game.world.width / 2, game.world.height-1, game.world.width, 1, 'red');

	lasers.add(bBRV);lasers.add(bBLH);lasers.add(bBRT);lasers.add(bBLB);
	lasers.add(rBRV);lasers.add(rBLH);lasers.add(rBRT);lasers.add(rBLB);

	// lasers.inputEnabled = true;
	// lasers.input.enableDrag();
	// lasers.input.enableSnap(32, 32, false, true);
	cursors = game.input.keyboard.createCursorKeys();

}

function update(){
	if (cursors.left.isDown){
		game.camera.x -= 4;
	}
	else if (cursors.right.isDown){
		game.camera.x += 4;
	}
	if (cursors.up.isDown){
		game.camera.y -= 4;
	}
	else if (cursors.down.isDown){
		game.camera.y += 4;
	}
}
