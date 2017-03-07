const tileSize = 44;
const amountOfFields = 25;
const laserSize = 2;
var lasers;

function World(game) {
    this.game = game;
}

World.prototype.load = function () {
    map = this.game.add.tilemap();

    map.addTilesetImage();

}

World.prototype.makeGrid = function () {
    this.game.world.resize((amountOfFields * 2) * tileSize, amountOfFields * tileSize);

    lasers = this.game.add.group();

    for (let i = 1; i < amountOfFields; ++i) {
        let blueVertical = this.game.add.tileSprite(i * tileSize, 0, laserSize, this.game.world.height, 'blue');
        let blueHorizontal = this.game.add.tileSprite(0, i * tileSize, this.game.world.width / 2, laserSize, 'blue');
        let redVertical = this.game.add.tileSprite(this.game.world.width / 2 + i * tileSize, 0, laserSize, this.game.world.height, 'red');
        let redHorizontal = this.game.add.tileSprite(this.game.world.width / 2, i * tileSize, this.game.world.width / 2, laserSize, 'red');
        lasers.add(blueVertical);
        lasers.add(blueHorizontal);
        lasers.add(redVertical);
        lasers.add(redHorizontal);
    }

    var bBRV = this.game.add.tileSprite(0, 0, 1, this.game.world.height, 'blue');
    var bBLH = this.game.add.tileSprite(0, 0, this.game.world.width / 2, 1, 'blue');
    var bBRT = this.game.add.tileSprite(this.game.world.width / 2 - 1, 0, 1, this.game.world.height, 'blue');
    var bBLB = this.game.add.tileSprite(0, this.game.world.height - 1, this.game.world.width / 2, 1, 'blue');

    var rBRV = this.game.add.tileSprite(this.game.world.width / 2, 0, 1, this.game.world.height, 'red');
    var rBLH = this.game.add.tileSprite(this.game.world.width / 2, 0, this.game.world.width / 2, 1, 'red');
    var rBRT = this.game.add.tileSprite(this.game.world.width - 1, 0, 1, this.game.world.height, 'red');
    var rBLB = this.game.add.tileSprite(this.game.world.width / 2, this.game.world.height - 1, this.game.world.width, 1, 'red');

    lasers.add(bBRV);
    lasers.add(bBLH);
    lasers.add(bBRT);
    lasers.add(bBLB);
    lasers.add(rBRV);
    lasers.add(rBLH);
    lasers.add(rBRT);
    lasers.add(rBLB);

    // lasers.inputEnabled = true;
    // lasers.input.enableDrag();
    // lasers.input.enableSnap(32, 32, false, true);
    cursors = this.game.input.keyboard.createCursorKeys();
}

World.prototype.moveMap = function () {
    // if (cursors.left.isDown) {
    //     game.camera.x -= 4;
    // } else if (cursors.right.isDown) {
    //     game.camera.x += 4;
    // }
    // if (cursors.up.isDown) {
    //     game.camera.y -= 4;
    // } else if (cursors.down.isDown) {
    //     game.camera.y += 4;
    // }


    if (this.game.input.activePointer.isDown) {
        if (this.game.origDragPoint) {
            // move the camera by the amount the mouse has moved since last update		
            this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
            this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
        }
        // set new drag origin to current position	
        this.game.origDragPoint = this.game.input.activePointer.position.clone();
    } else {
        this.game.origDragPoint = null;
    }
}