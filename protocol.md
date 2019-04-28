# <center> Const </center>

# <center> Class </center>
### MaterialEntry
#### MaterialEntry(materialName, fileNames)
  + String    materialName
  + Array     fileNames[String]

### AchievementEntry
#### new AchievementEntry(type, description, gifts, unlocked, hasGift)
  + Number    type
    0. 一般
    1. 特殊
    2. 隱藏
  + String    description
  + Number    gifts
    0. 兌換券
    n. 第n方塊
  + Boolean   unlocked
  + Boolean   hasGift

### Displayer
#### new Displayer(appElem)
  + Object    renderer
  + Object    scene
  + Object    camera
  + Object    pointLight
  + Object    cameraInfo
  + Object    mouseInfo
  + Number    displayType
  + Object    rayCaster
  + Array     gameBricks[Brick]
  + Array     selectorBricks[Brick]
  + Object    gameGroup
  + Object    selectorGroup
  + Object    mouseVector
  + Number    appWidth
  + Number    appHeight
  + Object    appElem
  + Function  display(displayType)
    0. just Background
    1. gaming bricks
    2. select bricks
  + Function  resize(width, height)
  + Function  calcCamera()
  + Function  setGameBricks(bricks)
    + Array   bricks[Brick]
  + Function  setBrickSelectors(bricks)
    + Array   bricks[Brick]

  <!-- mouse events -->
  + Function  mouseDownEvent(e)
  + Function  mouseMoveEvent(e)
  + Function  mouseUpEvent(e)
  + Function  wheelEvent(e)
  + Function  calcMouseRay(e)

### Brick
#### new Brick(game, materialName, facePattern)
  + Game      game
  + String    materialName
  + Array     facePattern [faceId: 0-5], len: 2-n
  + Object    rotation
    + get set x
    + get set y
    + get set z

  <!-- mouse events  -->
  + Function  mouseDownEvent(x, y, faceX, faceY, faceZ)
  + Function  mouseMoveEvent(x, y)

### Game
#### new Game(displayer, brickCount)
  + Displayer displayer
  + Array     gameBricks [Brick]
  + Number    timeCounter
  + Number    stepCounter
  + Function  isResolve()

### App
#### new App()
  + Displayer displayer
  + Number    brickCount
  + Game      game
  + Number    volume
  + Audio     bgm

  <!-- 主頁 -->
  + Function  start()
  + Function  gotoSetting()
  + Function  gotoAchievement()

  <!-- 遊戲畫面 -->
  + Function  pause()
  + Function  submit()

  <!-- 遊戲畫面_暫停中 -->
  + Function  continue()
  + Function  restarting()
  + Function  exit()
  + Function  setVolume(value)

  <!-- setting page -->
  + Function  increaseBrickCount()
  + Function  decreaseBrickCount()
  + Function  setBrickTexture(textureId)

  <!-- achievement page -->
  + Function  pickupGift(achievementId)

# <center> Html </center>
### 主畫面
  + <button onclick="app.start()">開始按鈕</button>
  + etc...
