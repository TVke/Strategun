function Scale(game){
  this.game = game;
}
var buttonSpace = 10,assetSize = 46,zoomButton,zoomIn = true;

Scale.prototype.load = function(){
  this.game.load.image('scaleIn','assets/grid/loop plus.png');
  this.game.load.image('scaleOut','assets/grid/loop min.png');
}
Scale.prototype.makeButton = function(){
    zoomButton = game.add.button(window.innerWidth - (buttonSpace + assetSize), 0,'scaleOut',gameObjects.scale.changeZoomLevel);
    zoomButton.fixedToCamera = true;
}
Scale.prototype.changeZoomLevel = function () {
    zoomButton.destroy();
    if(zoomIn){
        zoomButton = game.add.button(window.innerWidth - (buttonSpace + assetSize), 0, 'scaleIn',gameObjects.scale.changeZoomLevel);
        zoomButton.fixedToCamera = true;
        zoomIn = false;
        //game.world.scale.
    }else{
        zoomButton = game.add.button(window.innerWidth - (buttonSpace + assetSize), 0, 'scaleOut',gameObjects.scale.changeZoomLevel);
        zoomButton.fixedToCamera = true;
        zoomIn = true;
    }
}
