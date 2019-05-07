import { getMaterial } from './material.js';

const BRICKFACEKEYS = [ "front", "back", "top", "bottom", "left", "right" ]
/**
 * 方塊
 */
class Brick { // eslint-disable-line no-unused-vars
  /**
   * 初始化方塊
   * @param {App} app
   * @param {!string} materialName - 材質名稱
   * @param {{top:number, bottom:number, left:number, right:number, front:number, back:number}} facePattern
   */
  constructor(app, facePattern) {
    let textures = getMaterial(app.materialName).fileNames
      , geometry = new THREE.BoxGeometry( 2, 2, 2 )
      , material = BRICKFACEKEYS.map(k => 
        new THREE.MeshPhongMaterial({
          map: new THREE
            .TextureLoader()
            .load('img/' + textures[facePattern[k]]),
        }))
    this.app = app
    this.materialName = app.materialName
    this.facePattern = facePattern
    this.facePatternOriginal = { ...facePattern }
    this.orientation = { x: 0, y: 0, z: 0 }
    this.renderObject = new THREE.Mesh(geometry, material)
  }

  get rotation() {
    return this.renderObject.rotation
  }

  /**
   * 從 orientation 更新 facePattern 
   */
  updateFacePattern () {
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
    // TODO
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  mouseMoveEvent(x, y) {
    // TODO
  }

  /**
   *
   */
  mouseUpEvent() {
    // TODO
  }
}

class GameBrick extends Brick {
  /**
   * 初始化遊戲方塊
   * @param {App} app
   * @param {!string} materialName - 材質名稱
   * @param {{top:number, bottom:number, left:number, right:number, front:number, back:number}} facePattern
   */
  constructor (app, materialName, facePattern) {
    super(app, materialName, facePattern)
  }
}

class SelectorBrick extends Brick {
  /**
   * 初始化樣式選擇方塊
   * @param {App} app
   * @param {!string} materialName - 材質名稱
   * @param {{top:number, bottom:number, left:number, right:number, front:number, back:number}} facePattern
   */
  constructor (app, materialName, facePattern) {
    super(app, materialName, facePattern)
  }
}

export { GameBrick, SelectorBrick }