var loadLevel = function(game, n) {
  n = n - 1
  var level = levels[n]
  var blocks = []
  for(var i = 0; i < level.length; i++) {
    var position = level[i]
    var block = Block(game, position)
    blocks.push(block)
  }
  return blocks
}
  
  // debug模式下 blocks和paused是全局变量；非debug模式下改成blocks在_main()函数里，paused是game的属性
  window.blocks = []
  window.paused = false
  var enableDebugMode = function(game, enable) {
    if(!enable) {
      return
    }

    // 拖动滑块调价fps
    document.querySelector("#id-input-speed").addEventListener('input', function(event){
      log(event.target.value)
      window.fps = event.target.value
    })
    // 按键p暂停恢复游戏
    window.addEventListener('keydown', function(event){
      var key = event.key
      if(key == 'p') {
        paused = !paused
      } else if ('1234567'.includes(key)) {
        blocks = loadLevel(game, Number(key))
      }
    })
    
  }

  var _main = function() {
    var images = {
      ball: "img/ball.png",
      block: "img/block.png",
      paddle: "img/paddle.png",
    }
    var game = new Game(60, images, function(game){
      var scene = new SceneTitle(game)
      game.runWithScene(scene)
    })
    enableDebugMode(game, true)
   
  }
  _main()