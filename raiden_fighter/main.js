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
      sea: "img/sea.png",
      player: "img/fighter.png",
      cloud: "img/cloud.png",
      player_bullet: "img/player_bullet.png",
      enemy_bullet :"img/enemy_bullet.png",
      enemy0 :"img/enemy0.png",
      enemy1 :"img/enemy1.png",
      enemy2 :"img/enemy2.png",
      spark: "img/spark.png",
    }
    var game = new Game(60, images, function(game){
      var scene = new SceneTitle(game)
      game.runWithScene(scene)
    })
    enableDebugMode(game, true)
   
  }
  _main()