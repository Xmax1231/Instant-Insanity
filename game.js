import { Brick } from './brick.js';
/**
 * 操控方塊遊戲本身
 */
class Game { // eslint-disable-line no-unused-vars
  /**
   * 初始化遊戲
   * @param {Displayer} displayer
   * @param {number} brickCount - 方塊數量
   */
  constructor(app) {
    let bricks = Array
    .from({ length: app.brickCount }, () =>
      new Brick(this, app.materialName, {
        top: 1,
        bottom: 4,
        front: 0,
        back: 5,
        right: 3,
        left: 2,
      }))
    app.displayer.setGameBricks(bricks)
    this.app = app
  }

  /**
   *
   */
  isResolve() {
    // TODO
  }
}


export {Game};
