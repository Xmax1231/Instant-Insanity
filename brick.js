import { getMaterial } from './material.js';

const BRICKFACEKEYS = ["front", "back", "top", "bottom", "left", "right"]

const POSSIBLEQUATERNION = [];
for (let y = 0; y < 4; y++) {
  for (let z = 0; z < 4; z++) {
    POSSIBLEQUATERNION.push(
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, y * Math.PI / 2, z * Math.PI / 2, 'YZX')
      )
    );
  }
}
[1, -1].forEach(x => {
  for (let z = 0; z < 4; z++) {
    POSSIBLEQUATERNION.push(
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(x * Math.PI / 2, 0, z * Math.PI / 2, 'XZY')
      )
    );
  }
});

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
    this.mouseStartX = 0
    this.mouseStartY = 0
    this.mouseLastX = 0
    this.mouseLastY = 0
    this.mouseDown = false
    this.disableMouse = false;
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
    this.mouseStartX = x
    this.mouseStartY = y
    this.mouseLastX = x
    this.mouseLastY = y
    this.faceX = faceX
    this.faceY = faceY
    this.faceZ = faceZ
    this.face = new THREE.Vector3(faceX, faceY, faceZ)
    this.faceNormalVector = new THREE.Vector3(faceX, faceY, faceZ).applyQuaternion(this.renderObject.quaternion).round()
    console.log('faceNormalVector', this.faceNormalVector)
    this.mouseDown = true
    this.lockOnX = false
    this.lockOnY = false
    this.game.app.info2_div.innerHTML = 'x:' + this.mouseStartX + ' y:' + this.mouseStartY + ' face:' + this.faceX * 1 + ' ' + this.faceY * 1 + ' ' + this.faceZ * 1;
    this.axisX = new THREE.Vector3(0, 1, 0)
    this.axisY = new THREE.Vector3(0, 1, 0).cross(this.faceNormalVector)
    console.log('axisX', this.axisX)
    console.log('axisY', this.axisY)
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  mouseMoveEvent(x, y) {
    if (!this.mouseDown) {
      return
    }

    this.game.app.info2_div.innerHTML = 'x:' + this.mouseStartX + ' y:' + this.mouseStartY + ' face:' + this.faceX * 1 + ' ' + this.faceY * 1 + ' ' + this.faceZ * 1 + '<br>'
      + 'dx:' + (x - this.mouseStartX) + ' dy:' + (y - this.mouseStartY);

    if (this.disableMouse) {
      this.game.app.info2_div.innerHTML += ' mouse disabled';
      return
    }

    // 暫時停用拖曳上下面
    if (this.faceNormalVector.equals(this.axisX)) {
      this.game.app.info2_div.innerHTML += ' face disabled';
      return
    }

    if (!this.lockOnX && !this.lockOnY) {
      if (Math.abs(x - this.mouseStartX) > 10) {
        this.lockOnX = true;
      } else if (Math.abs(y - this.mouseStartY) > 10) {
        this.lockOnY = true;
      }
    }
    let dx = x - this.mouseLastX
    let dy = y - this.mouseLastY
    if (this.lockOnX)
      this.renderObject.rotateOnWorldAxis(this.axisX, Math.PI * dx / 150)
    if (this.lockOnY)
      this.renderObject.rotateOnWorldAxis(this.axisY, Math.PI * dy / 150)
    this.mouseLastX = x
    this.mouseLastY = y
  }

  /**
   *
   */
  mouseUpEvent() {
    if (this.disableMouse) {
      return
    }

    this.mouseDown = false
    this.lockOnX = false
    this.lockOnY = false
    this.disableMouse = true

    let closestQuaternion = null;
    let minAngle = 999;

    POSSIBLEQUATERNION.forEach(quaternion => {
      let angle = this.renderObject.quaternion.angleTo(quaternion);
      if (angle < minAngle) {
        minAngle = angle;
        closestQuaternion = quaternion;
      }
    });
    console.log('closest angle', minAngle, closestQuaternion);

    var intX = setInterval(() => {
      let prevQuaternion = this.renderObject.quaternion.clone();
      this.renderObject.quaternion.rotateTowards(closestQuaternion, Math.PI / 50);
      if (this.renderObject.quaternion.equals(prevQuaternion)) {
        clearInterval(intX)
        this.disableMouse = false
      }
    }, 100);
  }
}

export { Brick }
