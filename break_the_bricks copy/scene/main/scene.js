var Scene = function(game) {

  //初始化
  

  blocks = loadLevel(game, 1);
  var score = 0;
  var ball = Ball(game);
  var paddle = Paddle(game);
  game.registerEvent('ArrowLeft', function(){
    paddle.moveLeft();
  })

  game.registerEvent('ArrowRight', function(){
    paddle.moveRight();
  })
  game.registerEvent('f', function(){
    ball.fire();
  })

  var s = {

  }
      // 拖动球测试碰撞

  var dragMove = function(ball) {
    var moveable = false;
    game.canvas.addEventListener('mousedown', function(event){
      // log(event.offsetX,event.offsetY)
      moveable = true;
    })
    game.canvas.addEventListener('mousemove', function(event){
      if(moveable) {
        ball.x = event.offsetX - (ball.w / 2);
        ball.y = event.offsetY - (ball.h / 2);
      }
    })
    game.canvas.addEventListener('mouseup', function(event){
      log(event)
      moveable = false
    })
  }
  dragMove(ball)
  
  s.draw = function() {
    game.drawImage(paddle)
    game.drawImage(ball)
    for(var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if(block.alive) {
        game.drawImage(block)
      }
    }
    //draw score
    game.ctx.font = '20px serif';
    game.ctx.fillText('分数： ' + score, 20, 470);
  }

  s.update = function() {
    if(paused) {
      return
    }
    ball.move();
    //判断碰撞到板子
    if(paddle.collide(ball)) {
      log('paddle collides ball',paddle,ball)
      ball.x -= ball.speedX
      ball.y -= ball.speedY
      if(!paddle.collide(ball)) {
        ball.x += ball.speedX
        ball.y += ball.speedY
        ball.bounce();
      }
      ball.x += ball.speedX
      ball.y += ball.speedY
    }
    //判断碰撞到砖块
    for(var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if(block.collide(ball)) {
        log('block collides ball',block,ball)
        block.kill();
        ball.bounce();
        score++
      }
    }
    //判断游戏结束
    if(ball.y + ball.h >= game.ctx.canvas.height) {
      var scene_end = new SceneEnd(game);
      game.replaceScene(scene_end)
    }
  }
  return s;
}