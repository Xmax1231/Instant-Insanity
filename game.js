/**
 * 操控方塊遊戲本身
 */
class Game { // eslint-disable-line no-unused-vars
  /**
   * 初始化遊戲
   * @param {number} brickCount - 方塊數量
   */
  constructor(brickCount) {
    this.brickCount = brickCount;

    this.bricks = [];
    for (let i = 1; i <= brickCount; i++) {
      const brick = [
        i,
        i,
        Math.floor(Math.random() * brickCount + 1),
        i,
        i,
        Math.floor(Math.random() * brickCount + 1),
      ];
      this.bricks.push(brick);
    }
    // 打亂同一側面
    [0, 1, 3, 4].forEach((face) => {
      for (let bid = 0; bid < brickCount - 1; bid++) {
        const j = Math.floor(Math.random() * (this.brickCount - bid) + bid);
        [this.bricks[bid][face], this.bricks[j][face]] =
          [this.bricks[j][face], this.bricks[bid][face]];
      }
    });
    // 打亂單個 brick
    for (let bid = 0; bid < this.brickCount; bid++) {
      for (let i = 0; i < 10; i++) {
        const dir = Math.floor(Math.random() * 3);
        const angle = Math.floor(Math.random() * 3 + 1);
        this.rotateY(bid, angle);
        switch (dir) {
          case 0:
            this.rotateX(bid, angle);
            break;
          case 1:
            this.rotateY(bid, angle);
            break;
          case 2:
            this.rotateZ(bid, angle);
            break;
        }
      }
    }

    this.timeCounter = 0; // TODO
    this.stepCounter = 0;
  }

  /**
   * 以 x 為軸，朝向 x- 順時針旋轉
   * @param {number} brickId - 第幾個 Brick
   * @param {number} angle - 旋轉了幾個90度，應為1~3
   */
  rotateX(brickId, angle) {
    if (!Number.isInteger(angle)) {
      throw Error('angle is not a integer');
    }

    angle = (angle % 4 + 4) % 4;
    if (angle == 0) {
      console.log('Nothing to do');
    } else {
      for (let i = 0; i < angle; i++) {
        [
          this.bricks[brickId][1],
          this.bricks[brickId][5],
          this.bricks[brickId][4],
          this.bricks[brickId][2],
        ] =
          [
            this.bricks[brickId][2],
            this.bricks[brickId][1],
            this.bricks[brickId][5],
            this.bricks[brickId][4],
          ];
      }
      console.log(`rotateX ${brickId} ${angle}`);
    }
    this.stepCounter++;
  }

  /**
   * 以 y 為軸，朝向 y- 順時針旋轉
   * @param {number} brickId - 第幾個 Brick
   * @param {number} angle - 旋轉了幾個90度，應為1~3
   */
  rotateY(brickId, angle) {
    if (!Number.isInteger(angle)) {
      throw Error('angle is not a integer');
    }

    angle = (angle % 4 + 4) % 4;
    if (angle == 0) {
      console.log('Nothing to do');
    } else {
      for (let i = 0; i < angle; i++) {
        [
          this.bricks[brickId][0],
          this.bricks[brickId][2],
          this.bricks[brickId][3],
          this.bricks[brickId][5],
        ] =
          [
            this.bricks[brickId][5],
            this.bricks[brickId][0],
            this.bricks[brickId][2],
            this.bricks[brickId][3],
          ];
      }
      console.log(`rotateY ${brickId} ${angle}`);
    }
    this.stepCounter++;
  }

  /**
   * 以 z 為軸，朝向 z- 順時針旋轉
   * @param {number} brickId - 第幾個 Brick
   * @param {number} angle - 旋轉了幾個90度，應為1~3
   */
  rotateZ(brickId, angle) {
    if (!Number.isInteger(angle)) {
      throw Error('angle is not a integer');
    }

    angle = (angle % 4 + 4) % 4;
    if (angle == 0) {
      console.log('Nothing to do');
    } else {
      for (let i = 0; i < angle; i++) {
        [
          this.bricks[brickId][0],
          this.bricks[brickId][4],
          this.bricks[brickId][3],
          this.bricks[brickId][1],
        ] =
          [
            this.bricks[brickId][1],
            this.bricks[brickId][0],
            this.bricks[brickId][4],
            this.bricks[brickId][3],
          ];
      }
      console.log(`rotateZ ${brickId} ${angle}`);
    }
    this.stepCounter++;
  }

  /**
   * @return {boolean} - 是否通關
   */
  isResolve() {
    let result = true;
    [0, 1, 3, 4].forEach((face) => {
      const temp = [];
      for (let bid = 0; bid < this.brickCount; bid++) {
        temp[this.bricks[bid][face]] = 1;
      }
      let sum = 0;
      for (let bid = 1; bid <= this.brickCount; bid++) {
        sum += temp[bid];
      }
      if (sum != this.brickCount) {
        result = false;
      }
    });
    return result;
  }
}


window.Game = Game;
