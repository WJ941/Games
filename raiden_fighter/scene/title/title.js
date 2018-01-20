class Particle extends GuaImage {
  constructor(game) {
    super(game, "spark")
    this.game = game
    this.life = 6
    this.init()
  }
  init(x, y, vx, vy) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy =vy
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    this.vx -= 0.01 * this.vx
    this.vy -= 0.01 * this.vy
    this.life--
  }
}
class GuaParticlesSystem {
  constructor(game, guaImage) {
    this.game = game
    this.guaImage = guaImage
    this.setup()
  }
  setup() {
    this.x = this.guaImage.x + this.guaImage.w / 2
    this.y = this.guaImage.y + this.guaImage.h / 2
    this.particles = []
    this.numberOfParticles = 20
    this.duration = 40
  }
  draw() {
    if(this.duration > 0) {
      for( var p of this.particles) {
        p.draw()
      }
    }
  }
  update() {
    this.duration--
    // update particles numbers
    if(this.particles.length <= this.numberOfParticles) {
      var spark = new Particle(this.game)
      var s = 5
      var vx = randomBetween(-s, s)
      var vy = randomBetween(-s, s)
      // log(randomBetween(-1, 0))
      spark.init(this.x, this.y, vx, vy)
      this.particles.push(spark)
    }
    //去掉死掉的spark
    this.particles = this.particles.filter( p => p.life > 0)
    for( var p of this.particles) {
      p.update()
    }
  }
}

class GuaLabel {
  constructor(game, text) {
    this.game = game
    this.text = text
  }
  draw() {
    this.game.ctx.font = '40px serif'
    this.game.ctx.fillText(this.text, 120, 200)
  }
  update() {

  }
}

class SceneTitle extends GuaScene {
  constructor(game) {
    super(game)
    this.game = game
    game.registerEvent('k', function(){
      var scene = new Scene(game)
      game.replaceScene(scene)
    })
    var startLabel = new GuaLabel(game, "Game Start")
    this.addElement(startLabel)
  }
}