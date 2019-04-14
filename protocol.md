# Const
## Archivement
  + String    description
  + Number    type
    0. 一般
    1. 特殊
    2. 隱藏
  + Number    gifts
    0. 兌換券
    n. 第n方塊
  + Boolean   taken

# Class
## Brick
  + Game      game
  + String    materialName
  + Object    rotation { x, y, z }
  + Function  deltaXY(deltaX, deltaY)

## Game
  + Number    brickCount
  + Array     bricks [Brick]
  + Function  display(displayType)
    0. just Background
    1. gaming bricks
    2. select bricks

## App
  + Number    pageState
  + Game      game

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
  + Function  useTexture(textureId)

  <!-- achievement page -->
  + Function  pickupGift(achievementId)

# Html
## 主畫面
  + <button onclick="app.start()">開始按鈕</button>
  + etc...
