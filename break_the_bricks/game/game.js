class Game {
  constructor(fps, images, runCallback){
    window.fps = fps
    this.images = images
    this.scene = null
    this.actions = {}
    this.keydowns = {}
    this.paused = false
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext('2d')
    this.runCallback = runCallback
    this.init()
  }
  
  drawImage(paddle) {
    this.ctx.drawImage(paddle.image, paddle.x, paddle.y)
  }
  registerEvent(key, callback) {
    this.actions[key] = callback
  }
  init(){
    var self = this
    //events
    window.addEventListener('keydown', (event) => {
      this.keydowns[event.key] = true
    })
    window.addEventListener('keyup', (event) => {
      this.keydowns[event.key] = false
    })

    //load all the images
    var names = Object.keys(this.images)
    var imageCount = 0
    names.forEach(function(name) {
      var path = self.images[name]
      var image = imageFromPath(path)
      image.onload = function() {
        self.images[name] = image
        imageCount ++
        if(imageCount == names.length) {
          self.run()
        }
      }
    })
  }

  runloop() {
    var actions = Object.keys(this.actions)
    for(var i = 0; i<= actions.length; i++) {
      var key = actions[i]
      if (this.keydowns[key]) {
        this.actions[key]()
      }
    }
    this.update()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.draw()
    var self = this
    setTimeout(function() {
      self.runloop()
    }, 1000/window.fps)
  }


  imageByName(name) {
    var image = this.images[name]
    return {
      image: image,
      w: image.width,
      h: image.height,
    }
  }
  run() {
    this.runCallback(this)
    var self = this
    setTimeout(function() {
      self.runloop()
    }, 1000/window.fps)
  }
  runWithScene(scene) {
    this.scene = scene
    this.update = function(){
      this.scene.update()
    }
    this.draw = function() {
      this.scene.draw()
    }
  }
  replaceScene(scene) {
    this.scene = scene
  }
}