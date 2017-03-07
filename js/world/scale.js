function Scale(game){
  this.game = game;
  this.buttonSpace = 20;
  this.assetSize = 55;
}
var zoomButton,zoomIn = true;

Scale.prototype.load = function(){
  this.game.load.image('scaleIn','assets/grid/loop plus.png');
  this.game.load.image('scaleOut','assets/grid/loop min.png');
}
Scale.prototype.makeButton = function(){
    zoomButton = game.add.button(window.innerWidth - (this.buttonSpace + this.assetSize),window.innerHeight - (this.buttonSpace + this.assetSize),'scaleOut',gameObjects.scale.changeZoomLevel);
    zoomButton.fixedToCamera = true;
}
Scale.prototype.changeZoomLevel = function () {
    zoomButton.destroy();
    if(this.zoomIn){
        zoomButton = game.add.button(window.innerWidth - (this.buttonSpace + this.assetSize), window.innerHeight - (this.buttonSpace + this.assetSize), 'scaleIn',gameObjects.scale.changeZoomLevel);
        zoomButton.fixedToCamera = true;
        this.zoomIn = false;
    }else{
        zoomButton = game.add.button(window.innerWidth - (this.buttonSpace + this.assetSize),window.innerHeight - (this.buttonSpace + this.assetSize),'scaleOut',gameObjects.scale.changeZoomLevel);
        zoomButton.fixedToCamera = true;
        this.zoomIn = true;
    }
}
