var e = selectElement => document.querySelector(selectElement)
var log = console.log
var imageFromPath = function(path) {
  var img = new Image()
  img.src = path
  return img
}
var pointInRect = function(rect, point) {
  if (   rect.x <= point.x && point.x <= rect.x + rect.width
      && rect.y <= point.y && point.y<= rect.y + rect.height)
      return true
  else 
    return false
}
var rectsCollide = function(rectA, rectB) {
  var aCollideB = function(rectA, rectB) {
    var Point = function(x, y) {
      return {
        x: x,
        y: y,
      }
    }
    if (   pointInRect(rectA, Point(rectB.x, rectB.y))
        || pointInRect(rectA, Point(rectB.x + rectB.width, rectB.y))
      )
      return true
    else 
      return false
  }
  var aCrossB = function(rectA, rectB) {
    if(rectA.x <= rectB.x && rectA.x + rectA.width >= rectB.x + rectB.width
        && rectA.y >= rectB.y && rectA.y <= rectB.y + rectB.height
    )
      return true
    else 
      return false
  }
  return aCollideB(rectA, rectB) || aCollideB(rectB, rectA) || aCrossB(rectB, rectA) || aCrossB(rectA, rectB)
}
var guaImageCollide = function(guaImageA, guaImageB) {
  var createRect = function(guaImage) {
    return {
      x: guaImage.x,
      y: guaImage.y,
      width: guaImage.image.width,
      height: guaImage.image.height,
    }
  }
  return   rectsCollide(createRect(guaImageA), createRect(guaImageB))
}
