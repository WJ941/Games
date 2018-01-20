var config = {
  player_speed: {
    value: 10,
    min: 1,
    max: 100,
    text: "玩家速度: ",
  },
  bullet_speed: {
    value: 10,
    min: 1,
    max: 100,
    text: "子弹速度: ",
  },
}
class Player extends GuaImage {
  constructor(game) {
    super(game, "player")
    this.speed = 10
    this.setup()
    this.cooldown = 0
  }
  setup() {
    this.speed = 8
    this.x = 140
    this.y = 500
  }
  update() {
    this.speed = config.player_speed.value
    if(this.cooldown > 0) {
      this.cooldown--
    }
  }
  fire() {
    if(this.cooldown == 0) {
      this.cooldown = 15
      var x = this.w / 2 + this.x
      var y = this.y
      this.bullet = new PlayerBullet(this.game)
      this.bullet.x = x - this.bullet.w / 2
      this.bullet.y = y - this.bullet.h
      this.scene.addElement(this.bullet)
    }
  }
  kill() {
    log('player be killed')
    var end = new SceneEnd(this.game)
    this.game.replaceScene(end)
  }
  moveX(x) {
    if( x < 0) {
      x = 0
    }
    if( x > 400 - this.textture.width) {
      x = 400 - this.textture.width
    }
    this.x = x
  }
  moveY(x) {
    if( x < 0) {
      x = 0
    }
    if( x > 600 - this.textture.height) {
      x = 600 - this.textture.height
    }
    this.y = x
  }
  moveLeft() {
    this.moveX(this.x -= this.speed)
  }
  moveRight() {
    this.moveX(this.x += this.speed)
  }
  moveUp() {
    this.moveY(this.y -= this.speed)
  }
  moveDown() {
    this.moveY(this.y += this.speed)
  }
}
class Enemy extends GuaImage {
  constructor(game) {
    var type = randomBetween(0, 3)
    var name = "enemy" + type
    super(game, name)
    this.setup()
  }
  setup() {
    this.speed = 2
    this.x = randomBetween(0, 300)
    this.y = -randomBetween(0, 10)
    this.cooldown = randomBetween(0, 60)
    this.bullet = new EnemyBullet(this.game)
    this.lives = 1
  }
  update() {
    this.y += this.speed
    if(this.y > 700) {
      this.setup()
    }
    if(this.cooldown > 0) {
      this.cooldown--
    }
    this.fire()
  }
  fire() {
    if(this.cooldown == 0) {
      this.cooldown = 60
      var x = this.w / 2 + this.x
      var y = this.y
      this.bullet = new EnemyBullet(this.game)
      this.bullet.speed = 5
      this.bullet.x = x - this.bullet.w / 2
      this.bullet.y = y + this.w
      
      this.scene.addElement(this.bullet)
    }
  }
  kill() {
    log('this enemy is killed',this.lives)
    this.lives--
    var particleSystem = new GuaParticlesSystem(this.game, this)
    this.scene.addElement(particleSystem)
  }
}
class Cloud extends GuaImage {
  constructor(game) {
    super(game, "cloud")
    this.setup()
  }
  setup() {
    this.speed = 1
    this.x = randomBetween(0, 300)
    this.y = randomBetween(0, 100)
  }
  update() {
    this.y += this.speed
    if(this.y > 700) {
      this.setup()
    }
  }
}
class Bullet extends GuaImage {
  constructor(game, image_name) {
    super(game, image_name)
    this.setup()
  }
  setup() {
    this.speed = 2
    this.lives = 1
  }
  collide(guaImage) {
    return guaImageCollide(this, guaImage)
  }
}
class PlayerBullet extends Bullet {
  constructor(game) {
    super(game, 'player_bullet')
  }
  update() {
    this.y -= this.speed
    this.checkCollided()
  }
  checkCollided() {
    var enemys = this.game.scene.enemys
    if(!enemys) {
      return
    }
    for(var i = 0; i < enemys.length; i++) {
      var enemy = enemys[i]
      if(this.collide(enemy)){
        enemy.kill()
        this.kill()
        return
      }
    }
  }
  kill(){
    this.lives--
  }
}
class EnemyBullet extends Bullet {
  constructor(game) {
    super(game, 'enemy_bullet')
  }
  update() {
    this.y += this.speed
    this.checkCollided()
  }
  checkCollided() {
    var player = this.game.scene.player
    if(!player) {
      return
    }
    if(this.collide(player)){
      player.kill()
    }
  }
}
const randomBetween = function(start, end) {
  var random = Math.random() * (end - start) + start
  return Math.floor(random)
}
class Scene extends GuaScene {
  constructor(game) {
    super(game)
    this.bg = new GuaImage(game, "sea")
    this.player = new Player(game)

    this.cloud = new GuaImage(game, "cloud")
    this.numberOfEnemy =4
    this.numberOfCloud =4
    this.setup()
    this.setupInputs()
    this.addEnemys()
    this.addClouds()
  }
  setup() {
    this.addElement(this.bg)
    this.addElement(this.player)
  }
  setupInputs() {
    var g = this.game
    var s = this
    g.registerEvent('ArrowLeft', function() {
      s.player.moveLeft()
    })
    g.registerEvent('ArrowRight', function() {
      s.player.moveRight()
    })
    g.registerEvent('ArrowUp', function() {
      s.player.moveUp()
    })
    g.registerEvent('ArrowDown', function() {
      s.player.moveDown()
    })
    g.registerEvent('f', function() {
      s.player.fire()
    })
  }
  addEnemys() {
    var es = []
    for(var i = 0; i < this.numberOfEnemy; i++) {
      var e = new Enemy(this.game)
      this.addElement(e)
      es.push(e)
    }
    this.enemys = es
  }
  addClouds() {
    var cs = []
    for(var i = 0; i < this.numberOfCloud; i++) {
      var c = new Cloud(this.game)
      this.addElement(c)
      cs.push(c)
    }
    this.clouds = cs
  }
  update() {
    super.update()
    this.cloud.y += 1
  }
}