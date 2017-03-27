const amountOfRows = 20;
const laserSize = 2;

function World(game) {
    this.game = game;
    this.map = null;
}

World.prototype.load = function () {
    this.game.stage.backgroundColor = '#efefef';

    this.game.load.image('red', 'assets/grid/red laser.png');
    this.game.load.image('blue', 'assets/grid/blue laser.png');
    this.game.load.image('metal', 'assets/grid/metal.png');

    this.game.load.image('wall', 'assets/grid/wall.png');
    this.game.load.image('olie', 'assets/grid/olie.png');

    grid = this.game.add.tilemap();

    this.game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);
}

World.prototype.tileProperties = function(map, layer){
    tileData = new Array(amountOfRows);

    for(let item = 0; item < amountOfRows; item++){
        tileData[item] = new Array(amountOfFields);
    }

    for(let tileY = 0; tileY < amountOfFields; tileY++){
        for(let tileX = 0; tileX < amountOfRows; tileX++){
            if(map.getTile(tileX, tileY, layer) === null){
                tileData[tileX][tileY] = 0;
            }else{
                tileData[tileX][tileY] = map.getTile(tileX, tileY, layer).index;
            }
        }
    }
}

World.prototype.makeMap = function () {
    var map = this.game.add.tilemap('map');

    map.addTilesetImage('wall', 'wall');
    map.addTilesetImage('olie', 'olie');

    layer = map.createLayer(0);
    layer.resizeWorld();

    tileLayer = layer;
    tileMap = map;

    this.tileProperties(map, layer)
}

World.prototype.makeGrid = function () {
    this.game.world.resize((amountOfFields * 2) * tileSize, amountOfFields * tileSize);

    for (let i = 1; i < amountOfFields; ++i) {
        this.game.add.tileSprite(i * tileSize, 0, laserSize, this.game.world.height, 'blue');
        this.game.add.tileSprite(0, i * tileSize, this.game.world.width / 2, laserSize, 'blue');
        this.game.add.tileSprite(this.game.world.width / 2 + i * tileSize, 0, laserSize, this.game.world.height, 'red');
        this.game.add.tileSprite(this.game.world.width / 2, i * tileSize, this.game.world.width / 2, laserSize, 'red');
    }

    this.game.add.tileSprite(0, 0, 2, this.game.world.height, 'blue');
    this.game.add.tileSprite(0, 0, this.game.world.width / 2, 2, 'blue');
    this.game.add.tileSprite(0, this.game.world.height - 1, this.game.world.width / 2, 2, 'blue');

    this.game.add.tileSprite(this.game.world.width / 2, 0, this.game.world.width / 2, 2, 'red');
    this.game.add.tileSprite(this.game.world.width - 1, 0, 2, this.game.world.height, 'red');
    this.game.add.tileSprite(this.game.world.width / 2, this.game.world.height - 1, this.game.world.width / 2, 2, 'red');
}

World.prototype.moveMap = function () {
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

World.prototype.metal = function() {
    for (let y = 0; y < amountOfFields; ++y) {
        for (let x = 0; x < amountOfRows; ++x) {
            let metal = game.add.image(tileSize * x, tileSize * y, 'metal');
            metal.inputEnabled = true;
            metal.input.useHandCursor = true;
        }
    }
}
