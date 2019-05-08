import { getMaterial } from './material.js';

const BRICKFACEKEYS = ["front", "back", "top", "bottom", "left", "right"]
/**
 * 方塊
 */
class Brick { // eslint-disable-line no-unused-vars
  /**
   * 初始化方塊
   * @param {Game} game
   * @param {!string} materialName - 材質名稱
   * @param {{x:number, y:number, z:number}} facePattern
   */
  constructor(game, materialName, facePattern) {
    let textures = getMaterial(materialName).fileNames
      , geometry = new THREE.BoxGeometry(2, 2, 2)
      , material = BRICKFACEKEYS.map(k =>
        new THREE.MeshPhongMaterial({
          map: new THREE
            .TextureLoader()
            .load('img/' + textures[facePattern[k]]),
        }))
    this.materialName = materialName
    this.facePattern = facePattern
    this.facePatternOriginal = { ...facePattern }
    this.orientation = { x: 0, y: 0, z: 0 }
    this.renderObject = new THREE.Mesh(geometry, material)
    this.mouseLastX = 0
    this.mouseLastY = 0
    this.mouseDown = false
    this.game = game
  }

  get rotation() {
    return this.renderObject.rotation
  }

  /**
   * 從 orientation 更新 facePattern
   */
  updateFacePattern() {
    // TODO
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} faceX
   * @param {number} faceY
   * @param {number} faceZ
   */
  mouseDownEvent(x, y, faceX, faceY, faceZ) {
    this.mouseLastX = x
    this.mouseLastY = y
    this.faceX = faceX
    this.faceY = faceY
    this.faceZ = faceZ
    this.mouseDown = true
    this.game.app.info2_div.innerHTML = 'x:' + this.mouseLastX + ' y:' + this.mouseLastY + ' face:' + this.faceX * 1 + ' ' + this.faceY * 1 + ' ' + this.faceZ * 1;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  mouseMoveEvent(x, y) {
    if (!this.mouseDown)
      return

    let dx = x - this.mouseLastX
    let dy = y - this.mouseLastY
    this.game.app.info2_div.innerHTML = 'x:' + this.mouseLastX + ' y:' + this.mouseLastY + ' face:' + this.faceX * 1 + ' ' + this.faceY * 1 + ' ' + this.faceZ * 1 + '<br>'
      + 'dx:' + dx + ' dy:' + dy;
  }

  /**
   *
   */
  mouseUpEvent() {
    this.mouseDown = false
  }
}

export { Brick }