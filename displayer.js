/**
 * 顯示方塊
 */
class Displayer { // eslint-disable-line no-unused-vars
  /**
   * 初始化
   * @param {*} appElem
   */
  constructor(appElem) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, 0, 0.1, 1000 )
    this.pointLight = new THREE.PointLight(0xffffff, 1.2)
    this.cameraInfo = {
      r: 6,
      theta: 1/4,
      phi: 1/4,
      displayer: this,
      deltaXY (dx, dy) {
        let { displayer: { displayType } } = this
        this.theta += (dy / 500) * (displayType == Displayer.GAMMING ? 1 : -1)
        this.phi += (dx / 500) * (displayType == Displayer.GAMMING ? 1 : -1)
        if (this.theta > .4) 
          this.theta = .4
        else if (this.theta < -.4) 
          this.theta = -.4
        if (this.phi > 2) 
          this.phi -= 2
        else if (this.phi < -2) 
          this.phi += 2
      }
    }
    this.mouseInfo = {
      lastX: 0,
      lastY: 0,
      mouseDown: false,
      interObject: null,
    }
    this.displayType = Displayer.BACKGROUND
    this.rayCaster = new THREE.Raycaster()
    this.mouseVector = new THREE.Vector2(-1, -1)
    this.gameBricks = []
    this.selectorBricks = []
    this.gameGroup = new THREE.Group()
    this.selectorGroup = new THREE.Group()
    this.appWidth = 0
    this.appHeight = 0
    this.appElem = appElem
    this.appElem.appendChild(this.renderer.domElement)
    this.camera.position.set(4, 4, 4)
    this.camera.lookAt(0, 0, 0)
    this.pointLight.position.setFromMatrixPosition(this.camera.matrix)
    this.scene.add(this.pointLight)
    this.scene.add(this.gameGroup)
    this.scene.add(this.selectorGroup)
    this.calcCamera()
    this.resize()
    window.addEventListener('resize', () => this.resize())
    window.addEventListener('mousedown', e => this.mouseDownEvent(e))
    window.addEventListener('mousemove', e => this.mouseMoveEvent(e))
    window.addEventListener('mouseup', e => this.mouseUpEvent(e))
    window.addEventListener('touchstart', e => this.mouseDownEvent(e.touches[0]))
    window.addEventListener('touchmove', e => this.mouseMoveEvent(e.touches[0]))
    window.addEventListener('touchend', e => this.mouseUpEvent(e))
    window.addEventListener('wheel', e => this.wheelEvent(e))
    setInterval(() => 
      this.renderer.render(this.scene, this.camera), 33)
  }

  /**
   *
   * @param {number} displayType
   */
  display(displayType) {
    let { gameGroup, selectorGroup } = this
    this.displayType = displayType
    gameGroup.visible = (displayType == Displayer.GAMMING)
    selectorGroup.visible = (displayType == Displayer.SELECTING)
  }

  /**
   *
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    let { appElem, renderer, camera } = this
    if (width == null || height == null) {
      let b = appElem.getBoundingClientRect()
      width = b.width
      height = b.height
    }

    this.appWidth = width
    this.appHeight = height
    renderer.setSize(width, height, true)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  /**
   *
   */
  calcCamera() {
    let { camera, cameraInfo, pointLight } = this
      , { r, theta, phi } = cameraInfo
    let _ = r * Math.cos(theta * Math.PI)
      , x = _ * Math.cos(phi * Math.PI)
      , y = r * Math.sin(theta * Math.PI)
      , z = _ * Math.sin(phi * Math.PI)
    camera.position.set(x, y, z)
    camera.lookAt(0, 0, 0)
    pointLight.position.setFromMatrixPosition(camera.matrix)
  }

  /**
   *
   * @param {Brick[]} bricks
   */
  setGameBricks(bricks) {
    let gameBricks = Array.from(bricks)
      , { gameGroup } = this
      , startY = bricks.length / 2 * 3 - 1.5
    this.gameBricks = gameBricks
    gameGroup.children.length = 0
    for (let { renderObject } of bricks) {
      gameGroup.add(renderObject)
      renderObject.position.y = startY
      startY -= 3
    }

  }

  /**
   *
   * @param {Brick[]} bricks
   */
  setBrickSelectors(bricks) {
    let selectorBricks = Array.from(bricks)
    this.selectorBricks = selectorBricks
    this.selectorGroup.children = selectorBricks.map(b => 
      b.renderObject)
  }

  /**
   *
   * @param {Event} e
   */
  mouseDownEvent(e) {
    e.preventDefault && e.preventDefault()
    let { mouseInfo } = this
    mouseInfo.lastX = e.clientX
    mouseInfo.lastY = e.clientY
    mouseInfo.mouseDown = true
    let [ brick, normal ] = this.calcMouseRay(e)
    mouseInfo.interObject = brick
    if (brick) {
      let { x, y, z } = normal
      brick.mouseDownEvent(e.clientX, e.clientY, x, y, z)
    }
  }

  /**
   *
   * @param {Event} e
   */
  mouseMoveEvent(e) {
    let { mouseInfo, cameraInfo } = this
    if (! mouseInfo.mouseDown) 
      return

    let dx = e.clientX - mouseInfo.lastX
    let dy = e.clientY - mouseInfo.lastY
    mouseInfo.lastX = e.clientX
    mouseInfo.lastY = e.clientY
    if (mouseInfo.interObject) {
      mouseInfo.interObject.mouseMoveEvent(e.clientX, e.clientY)
    } else {
      cameraInfo.deltaXY(dx, dy)
      this.calcCamera()
    }
  }

  /**
   *
   * @param {Event} e
   */
  mouseUpEvent(e) {
    let { mouseInfo } = this
      , { interObject } = mouseInfo
    if (interObject) 
      interObject.mouseUpEvent()

    mouseInfo.mouseDown = false
    mouseInfo.interObject = null
  }

  /**
   *
   * @param {Event} e
   */
  wheelEvent(e) {
    let { cameraInfo } = this
    cameraInfo.r -= e.wheelDeltaY / 150
    if (cameraInfo.r < 2) 
      cameraInfo.r = 2
    else if (cameraInfo.r > 100) 
      cameraInfo.r = 100
    this.calcCamera()
  }

  /**
   *
   * @param {Event} e
   */
  calcMouseRay(e) {
    let { displayType, mouseVector, appWidth, appHeight, rayCaster, camera, gameBricks, selectorBricks } = this
      , bricks, id2obj = {}, intersects, brick, faceNorm
    mouseVector.x = ( e.clientX / appWidth ) * 2 - 1
    mouseVector.y = - ( e.clientY / appHeight ) * 2 + 1
    rayCaster.setFromCamera(mouseVector, camera)
    switch (displayType) {
      case Displayer.BACKGROUND: 
        return []
      case Displayer.GAMMING: 
        bricks = gameBricks
        break
      case Displayer.SELECTING: 
        bricks = selectorBricks
        break
    }

    bricks.forEach(b => 
      id2obj[b.renderObject.uuid] = b)
    intersects = rayCaster.intersectObjects(bricks.map(b => 
      b.renderObject))
    if (intersects.length == 0) 
      return []

    brick = id2obj[intersects[0].object.uuid]
    faceNorm = intersects[0].face.normal

    // highlight intersected face?
    // for (let m of brick.renderObject.material) 
    //   m.color.set(true ? 0xff0000 : 0xffffff)

    return [ brick, faceNorm ]
  }
}

Displayer.BACKGROUND = 0
Displayer.GAMMING = 1
Displayer.SELECTING = 2

export {Displayer};