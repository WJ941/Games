// position 是格式[x accordiate, y accordiate, lives]的
var Block = function(game, position) {
  var p = position
  var o = game.imageByName('block')
    o.x= p[0],
    o.y= p[1],
    o.alive= true,
    o.lives= p[2] || 1,
  o.kill = function() {
    o.lives--
    if(o.lives < 1) {
      o.alive = false
    }
  }
  o.collide = function(ball) {
    if (o.alive) {
      return guaImageCollide(o, ball)
    }else {
      return false
    }
  }
  return o
}