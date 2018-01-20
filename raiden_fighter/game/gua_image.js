class GuaImage {
  constructor(game, name) {
    this.game = game
    this.textture = game.imageByName(name)
    this.x = 0
    this.y = 0
    this.w = this.textture.width
    this.h = this.textture.height
  }
  draw() {
    this.game.drawImage(this)
  }
  update() {

  }
}