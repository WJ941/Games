var Ball = function(game) {
  var o = game.imageByName('ball')
  o.x = 150
  o.y = 200
  o.speedX = 10
  o.speedY = 10
  o.fired = false

  o.fire = function() {
    o.fired = true
  }

  o.move = function() {
    if(o.fired) {
      if(o.x < o.image.width || o.x > 500 -  o.image.width) {
        o.speedX = -o.speedX
      }
      if(o.y < o.image.height || o.y > 500 - o.image.height) {
        o.speedY = -o.speedY
      }
      o.x += o.speedX
      o.y += o.speedY
      // log('boll is moving!')
    }
  }

  o.bounce = function() {
    o.speedY *= -1
  }

  return o
}