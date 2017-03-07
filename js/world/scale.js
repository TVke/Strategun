function Scale(game){
  this.game = game;
  this.zoomIn = true;
  this.buttonSpace = 20;
  this.assetSize = 55;
  this.zoomButton;
}

Scale.prototype.load = function(){
  this.game.load.image('scaleIn','assets/grid/loop plus.png');
  this.game.load.image('scaleOut','assets/grid/loop min.png');
}
Scale.prototype.makeButton = function(){
    this.zoomButton = this.game.add.button(window.innerWidth - (this.buttonSpace + this.assetSize),window.innerHeight - (this.buttonSpace + this.assetSize),'scaleOut');
    this.zoomButton.fixedToCamera = true;
}
Scale.prototype.changeZoomLevel = function () {
    if(zoomIn){
        this.game.add.button(window.innerWidth - (this.buttonSpace + this.assetSize), window.innerHeight - (this.buttonSpace + this.assetSize), 'scaleIn');
    }else{
        this.game.add.button(window.innerWidth - (this.buttonSpace + this.assetSize),window.innerHeight - (this.buttonSpace + this.assetSize),'scaleOut');
    }
}
