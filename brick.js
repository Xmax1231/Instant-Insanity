/**
 * 方塊
 */
class Brick {
  /**
   * 初始化方塊
   * @param {Game} game
   * @param {!string} materialName - 材質名稱
   * @param {{x:number, y:number, z:number}} facePattern
   */
  constructor(game, materialName, facePattern) {
    this.materialName = materialName;
    this.facePattern = facePattern;
    this.rotation = null; // TODO
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
