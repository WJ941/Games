var Paddle = function(game) {
  var o = game.imageByName('paddle')
  o.x = 150
  o.y = 400
  o.speed = 10
  //x 为新坐标的x 500为画布的宽度
  o.move = function(x) {
    if( x < 0) {
      x = 0
    }
    if( x > 500 - o.image.width) {
      x = 500 - o.image.width
    }
    o.x = x
  }
  o.moveLeft = function() {
    o.move(o.x -= o.speed)
  }
  o. moveRight = function() {
    o.move(o.x += o.speed)
  }

  o.collide = function(ball) {
    return guaImageCollide(o, ball)
  }
  return o
}
