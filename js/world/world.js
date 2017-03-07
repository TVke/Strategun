const tileSize = 44;
const amountOfFields = 25;
const amountOfRows = 50;
const laserSize = 2;

function World(game) {
    this.game = game;
    this.map = null;
}

World.prototype.load = function () {
    grid = this.game.add.tilemap();

    this.game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);

    this.game.load.image('wall', 'assets/grid/wall.png');
    this.game.load.image('olie', 'assets/grid/olie.png');
    this.game.load.image('red player', 'assets/grid/red player.png');
    this.game.load.image('blue player', 'assets/grid/blue player.png');
    this.game.stage.backgroundColor = '#efefef';

    this.game.load.image('red', 'assets/grid/red laser.png');
    this.game.load.image('blue', 'assets/grid/blue laser.png');
}

World.prototype.tileProperties = function(map, layer){
    tileData = new Array(amountOfRows);

    for(let item = 0; item < amountOfRows; item++){
        tileData[item] = new Array(amountOfFields);
    }

    for(let tileX = 0; tileX < amountOfRows; tileX++){
        for(let tileY = 1; tileY < amountOfFields+1; tileY++){

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
    map.addTilesetImage('red player', 'red player');
    map.addTilesetImage('blue player', 'blue player');

    layer = map.createLayer(0);
    layer.resizeWorld();

    tileLayer = layer;

    this.tileProperties(map, layer)    
    
}

World.prototype.makeGrid = function () {
    this.game.world.resize((amountOfFields * 2) * tileSize, amountOfFields * tileSize + tileSize);

    for (let i = 1; i < amountOfFields; ++i) {
        this.game.add.tileSprite(i * tileSize, tileSize, laserSize, this.game.world.height, 'blue');
        this.game.add.tileSprite(0, i * tileSize + tileSize, this.game.world.width / 2, laserSize, 'blue');
        this.game.add.tileSprite(this.game.world.width / 2 + i * tileSize, tileSize, laserSize, this.game.world.height, 'red');
        this.game.add.tileSprite(this.game.world.width / 2, i * tileSize + tileSize, this.game.world.width / 2, laserSize, 'red');
    }

    this.game.add.tileSprite(0, tileSize, 1, this.game.world.height - tileSize, 'blue');
    this.game.add.tileSprite(0, tileSize, this.game.world.width / 2, 1, 'blue');
    this.game.add.tileSprite(this.game.world.width / 2 - 1, tileSize, 1, this.game.world.height - tileSize, 'blue');
    this.game.add.tileSprite(0, this.game.world.height - 1, this.game.world.width / 2, 1, 'blue');

    this.game.add.tileSprite(this.game.world.width / 2, tileSize, 1, this.game.world.height - tileSize, 'red');
    this.game.add.tileSprite(this.game.world.width / 2, tileSize, this.game.world.width / 2, 1, 'red');
    this.game.add.tileSprite(this.game.world.width - 1, tileSize, 1, this.game.world.height - tileSize, 'red');
    this.game.add.tileSprite(this.game.world.width / 2, this.game.world.height - 1, this.game.world.width, 1, 'red');
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
