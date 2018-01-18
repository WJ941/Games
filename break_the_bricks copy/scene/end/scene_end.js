class SceneEnd extends GuaScene {
  constructor(game) {
    super(game)
    game.registerEvent('r', function(){
      var scene =new SceneTitle(game)
      game.replaceScene(scene)
    })
  }
  draw(){
    this.game.ctx.font = '40px serif'
    this.game.ctx.fillText('Game Over!', 160, 200)
    this.game.ctx.fillText('Press R Back To Title', 100, 250)
  }
}