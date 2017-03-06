/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />
/// <reference path="../node_modules/phaser/typescript/phaser_box2d.d.ts" />
/// <reference path="../node_modules/phaser/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser/typescript/p2.d.ts" />

const width = 0;
const height = 0;
scaleRatio = window.devicePixelRatio / 3;

let game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio,
	Phaser.CANVAS, 'strategun', {
    preload: preload,
    create: create,
    update: update
});

function preload(){

}

function create(){

}

function update(){

}

