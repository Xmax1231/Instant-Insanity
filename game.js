/**
 * 操控方塊遊戲本身
 */
class Game { // eslint-disable-line no-unused-vars
  /**
   * 初始化遊戲
   * @param {Displayer} displayer
   * @param {number} brickCount - 方塊數量
   */
  constructor(displayer, brickCount) {
    this.brickCount = brickCount;

    /** @type {Brick[]} */
    this.bricks = []; // TODO
    this.timeCounter = 0;
    this.stepCounter = 0;
  }

  /**
   *
   */
  isResolve() {
    // TODO
  }
}


export {Game};
