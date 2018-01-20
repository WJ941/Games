class GuaScene {
  constructor(game) {
    this.game = game
    this._elements = []
  }
  addElement(element) {
    element.scene = this
    this._elements.push(element)
  }
  draw() {
    for(var i = 0; i < this._elements.length; i++){
      var e = this._elements[i]
      e.draw()
    }
  }
  update() {
    this._elements = this._elements.filter(e => {
      if(e.lives) {
        return e.lives > 0
      }
      return true
    })
    for(var i = 0; i < this._elements.length; i++) {
      var e = this._elements[i]
      e.update()
    }
  }
}