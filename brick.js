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
    this.mouseDown = true
    this.lockOnX = false
    this.lockOnY = false
    this.game.app.info2_div.innerHTML = 'x:' + this.mouseStartX + ' y:' + this.mouseStartY + ' face:' + this.faceX * 1 + ' ' + this.faceY * 1 + ' ' + this.faceZ * 1;
    this.axisX = new THREE.Vector3(0, 1, 0).applyQuaternion(this.renderObject.quaternion)
    this.axisY = new THREE.Vector3(0, 1, 0).applyQuaternion(this.renderObject.quaternion).cross(new THREE.Vector3(this.faceX, this.faceY, this.faceZ))
    console.log(this.axisX)
    console.log(this.axisY)
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  mouseMoveEvent(x, y) {
    if (!this.mouseDown || this.disableMouse)
      return

    // 暫時停用拖曳上下面
    if (this.face.equals(this.axisX) || this.face.equals(this.axisY))
      return

    this.game.app.info2_div.innerHTML = 'x:' + this.mouseStartX + ' y:' + this.mouseStartY + ' face:' + this.faceX * 1 + ' ' + this.faceY * 1 + ' ' + this.faceZ * 1 + '<br>'
      + 'dx:' + (x - this.mouseStartX) + ' dy:' + (y - this.mouseStartY);

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
      this.renderObject.rotateOnAxis(this.axisX, Math.PI * dx / 150)
    if (this.lockOnY)
      this.renderObject.rotateOnAxis(this.axisY, Math.PI * dy / 150)
    this.mouseLastX = x
    this.mouseLastY = y
  }

  /**
   *
   */
  mouseUpEvent() {
    this.mouseDown = false
    this.lockOnX = false
    this.lockOnY = false
    this.disableMouse = true

    let disableCnt = 3

    let rotationX = this.renderObject.rotation.x / Math.PI * 180
    let targetRotationX = Math.round(rotationX / 90 % 1) * 90
    var deltaX;
    if (targetRotationX > rotationX) deltaX = Math.PI / 180
    else deltaX = -Math.PI / 180;
    var cntX = Math.floor(Math.abs(rotationX - targetRotationX));
    if (cntX == 0) {
      this.renderObject.rotation.x = targetRotationX / 180 * Math.PI
    }
    var intX = setInterval(() => {
      if (cntX <= 0) {
        clearInterval(intX)
        this.renderObject.rotation.x = targetRotationX / 180 * Math.PI
        disableCnt -= 1
        if (disableCnt == 0)
          this.disableMouse = false
      }
      this.renderObject.rotation.x += deltaX
      cntX -= 1
    }, 50);

    let rotationY = this.renderObject.rotation.y / Math.PI * 180
    let targetRotationY = Math.round(rotationY / 90 % 1) * 90
    // console.log(rotationY, targetRotationY)
    var deltaY;
    if (targetRotationY > rotationY) deltaY = Math.PI / 180
    else deltaY = -Math.PI / 180;
    var cntY = Math.floor(Math.abs(rotationY - targetRotationY));
    if (cntY == 0) {
      this.renderObject.rotation.y = targetRotationY / 180 * Math.PI
    }
    var intY = setInterval(() => {
      if (cntY <= 0) {
        clearInterval(intY)
        this.renderObject.rotation.y = targetRotationX / 180 * Math.PI
        disableCnt -= 1
        if (disableCnt == 0)
          this.disableMouse = false
      }
      this.renderObject.rotation.y += deltaY
      cntY -= 1
    }, 50);

    let rotationZ = this.renderObject.rotation.z / Math.PI * 180
    let targetRotationZ = Math.round(rotationZ / 90 % 1) * 90
    // console.log(rotationZ, targetRotationZ)
    var deltaZ;
    if (targetRotationZ > rotationZ) deltaZ = Math.PI / 180
    else deltaZ = -Math.PI / 180;
    var cntZ = Math.floor(Math.abs(rotationZ - targetRotationZ));
    if (cntZ == 0) {
      this.renderObject.rotation.z = targetRotationZ / 180 * Math.PI
    }
    var intZ = setInterval(() => {
      if (cntZ <= 0) {
        clearInterval(intZ)
        this.renderObject.rotation.z = targetRotationZ / 180 * Math.PI
        disableCnt -= 1
        if (disableCnt == 0)
          this.disableMouse = false
      }
      this.renderObject.rotation.z += deltaZ
      cntZ -= 1
    }, 50);
  }
}

export { Brick }