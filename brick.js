import { getMaterial } from './material.js';

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
      , geometry = new THREE.BoxGeometry( 2, 2, 2 )
      , material = facePattern.map(i => 
        new THREE.MeshPhongMaterial({
          map: new THREE
            .TextureLoader()
            .load('img/' + textures[i]),
        }))
    this.materialName = materialName
    this.facePattern = facePattern
    this.renderObject = new THREE.Mesh(geometry, material)
  }

  get rotation() {
    return this.renderObject.rotation
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
  mouseLeaveEvent() {
    // TODO
  }
}

export { Brick }