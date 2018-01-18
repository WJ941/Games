class SceneTitle extends GuaScene {
  constructor(game) {
    super(game)
    game.registerEvent('k', function(){
      var scene = Scene(game)
      game.replaceScene(scene)
    })
  }
  draw(){
    this.game.ctx.font = '40px serif'
    this.game.ctx.fillText('Game Start', 160, 200)
  }
}