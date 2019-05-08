import { Game } from './game.js';
import { Displayer } from './displayer.js';
import { getMaterial } from './material.js';

/**
 * 控制遊戲畫面
 */
class App { // eslint-disable-line no-unused-vars
  /**
   * 初始化App
   */
  constructor() {
    this.displayer = new Displayer(document.getElementById('render'));
    this.brickCount = 4;
    this.materialName = 'octant';
    this.game = null;
    this.volume = 1;
    this.bgm = null; // TODO
    this.displayer.scene.background = new THREE.CubeTextureLoader().load(getMaterial('test').fileNames.map(n => `img/${n}`))
  }

  // Home page

  /**
   * 清除畫面
   */
  clearPage() {
    var myNode = document.getElementById("game");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  /**
   * 前往遊戲首頁
   */
  gotoHome() {
    this.clearPage();
    this.displayer.display(Displayer.BACKGROUND)
    var home_div = document.createElement("div");
    var icon_div = document.createElement("div");
    var start_btn = document.createElement("button");
    var setting_btn = document.createElement("button");
    var achievement_btn = document.createElement("button");

    start_btn.onclick = () => { this.start(); };
    setting_btn.onclick = () => { this.gotoSetting(); };
    achievement_btn.onclick = () => { this.gotoAchievement(); };

    home_div.id = "home";
    icon_div.id = "icon-area";
    start_btn.id = "start";
    setting_btn.id = "gotoSetting";
    achievement_btn.id = "gotoAchievement";

    start_btn.innerText = "開始";
    setting_btn.innerText = "設定";
    achievement_btn.innerText = "成就";

    home_div.appendChild(icon_div);
    home_div.appendChild(start_btn);
    home_div.appendChild(setting_btn);
    home_div.appendChild(achievement_btn);

    document.getElementById("game").appendChild(home_div);
  }

  /**
   * 開始遊戲
   */
  start() {
    this.clearPage();
    this.game = new Game(this)
    this.displayer.display(Displayer.GAMMING)
    var play_div = document.createElement("div");
    var pause_btn = document.createElement("button");
    var submit_btn = document.createElement("button");
    // var canvas_div = document.createElement("div");
    var time_div = document.createElement("div");
    var move_div = document.createElement("div");
    var rotation_x = document.createElement("input");
    var rotation_y = document.createElement("input");
    var rotation_z = document.createElement("input");
    var pauseBackgroundPage_div = document.createElement("div");
    var pausePage_div = document.createElement("div");
    var continue_btn = document.createElement("button");
    var restart_btn = document.createElement("button");
    var exit_btn = document.createElement("button");
    var info_div = document.createElement("div");

    var first_cube = this.displayer.gameBricks[0].renderObject;
    function changeRotation(axis, value) {
      first_cube.rotation[axis] = value * Math.PI
      info_div.innerHTML = 'rotation.x = ' + first_cube.rotation._x.toFixed(2) + '<br>'
        + 'rotation.y = ' + first_cube.rotation._y.toFixed(2) + '<br>'
        + 'rotation.z = ' + first_cube.rotation._z.toFixed(2) + '<br>'
        + 'quaternion.x = ' + first_cube.quaternion._x.toFixed(2) + '<br>'
        + 'quaternion.y = ' + first_cube.quaternion._y.toFixed(2) + '<br>'
        + 'quaternion.z = ' + first_cube.quaternion._z.toFixed(2) + '<br>'
        + 'quaternion.w = ' + first_cube.quaternion._w.toFixed(2) + '<br>';
    }

    pause_btn.onclick = () => { this.pause(); };
    submit_btn.onclick = () => { this.submit(); };
    rotation_x.oninput = () => { changeRotation('x', +rotation_x.value) }
    rotation_y.oninput = () => { changeRotation('y', +rotation_y.value) }
    rotation_z.oninput = () => { changeRotation('z', +rotation_z.value) }
    continue_btn.onclick = () => { this.continue(); };
    restart_btn.onclick = () => { this.restart(); };
    exit_btn.onclick = () => { this.exit(); };

    play_div.id = "play";
    pause_btn.id = "pause";
    submit_btn.id = "submit";
    // canvas_div.id = "canvas-area";
    time_div.id = "time";
    move_div.id = "move";
    rotation_x.id = 'rotation_x'
    rotation_y.id = 'rotation_y'
    rotation_z.id = 'rotation_z'
    info_div.id = 'info'
    var rotationControlConfig = { type: 'range', min: 0, max: 2, step: 0.125, value: 0 }
    Object.assign(rotation_x, rotationControlConfig)
    Object.assign(rotation_y, rotationControlConfig)
    Object.assign(rotation_z, rotationControlConfig)
    pauseBackgroundPage_div.id = "pauseBackgroundPage";
    pausePage_div.id = "pausePage";
    continue_btn.id = "continue";
    restart_btn.id = "restart";
    exit_btn.id = "exit";
    submit_btn.innerText = "submit";
    time_div.innerText = "time:00.00";
    move_div.innerText = "move:0";
    continue_btn.innerText = "繼續遊戲";
    restart_btn.innerText = "重新遊戲";
    exit_btn.innerText = "結束遊戲";

    play_div.appendChild(submit_btn);
    // play_div.appendChild(canvas_div);
    play_div.appendChild(time_div);
    play_div.appendChild(move_div);
    play_div.appendChild(rotation_x);
    play_div.appendChild(rotation_y);
    play_div.appendChild(rotation_z);
    pauseBackgroundPage_div.appendChild(pausePage_div);
    pausePage_div.appendChild(continue_btn);
    pausePage_div.appendChild(restart_btn);
    pausePage_div.appendChild(exit_btn);

    pauseBackgroundPage_div.style.display = "none";

    document.getElementById("game").appendChild(pause_btn);
    document.getElementById("game").appendChild(play_div);
    document.getElementById("game").appendChild(pauseBackgroundPage_div);
    document.getElementById("game").appendChild(info_div);
  }

  /**
   * 前往設定頁
   */
  gotoSetting() {
    this.clearPage();
    this.displayer.display(Displayer.SELECTING)
    var setting_div = document.createElement("div");
    var brickNumSetting_div = document.createElement("div");
    var brickStyleSetting_div = document.createElement("div");
    var brickNumTXT_div = document.createElement("div");
    var increaseBrickCount_div = document.createElement("button");
    var BrickCount_div = document.createElement("div");
    var decreaseBrickCount_div = document.createElement("button");
    var brickStyleTXT_div = document.createElement("div");
    var brickShow_div = document.createElement("div");
    var gohome_btn = document.createElement("button");

    increaseBrickCount_div.onclick = () => { this.increaseBrickCount(); };
    decreaseBrickCount_div.onclick = () => { this.decreaseBrickCount(); };
    gohome_btn.onclick = () => { this.gotoHome() };

    setting_div.id = "setting";
    brickNumSetting_div.id = "brickNumSetting";
    brickStyleSetting_div.id = "brickStyleSetting";
    brickNumTXT_div.id = "brickNumTXT";
    increaseBrickCount_div.id = "increaseBrickCount";
    BrickCount_div.id = "BrickCount";
    decreaseBrickCount_div.id = "decreaseBrickCount";
    brickStyleTXT_div.id = "brickStyleTXT";
    brickShow_div.id = "brickShow";
    gohome_btn.id = "gohome";

    brickNumTXT_div.innerText = "方塊數：";
    brickStyleTXT_div.innerText = "方塊樣式：";
    increaseBrickCount_div.innerHTML = "+";
    decreaseBrickCount_div.innerHTML = "-";
    BrickCount_div.innerText = this.brickCount.toString();

    brickNumSetting_div.appendChild(brickNumTXT_div);
    brickNumSetting_div.appendChild(increaseBrickCount_div);
    brickNumSetting_div.appendChild(BrickCount_div);
    brickNumSetting_div.appendChild(decreaseBrickCount_div);
    brickStyleSetting_div.appendChild(brickStyleTXT_div);
    brickStyleSetting_div.appendChild(brickShow_div);
    setting_div.appendChild(brickNumSetting_div);
    setting_div.appendChild(brickStyleSetting_div);

    document.getElementById("game").appendChild(gohome_btn);
    document.getElementById("game").appendChild(setting_div);
  }

  /**
   * 前往成就頁
   */
  gotoAchievement() {
    this.clearPage();
    var achievement_div = document.createElement("div");
    var normal_div = document.createElement("div");
    var special_div = document.createElement("div");
    var hide_div = document.createElement("div");
    var gohome_btn = document.createElement("button");

    gohome_btn.onclick = () => { this.gotoHome() };

    achievement_div.id = "achievement";
    normal_div.id = "normal-area";
    special_div.id = "special-area";
    hide_div.id = "hide-area";
    gohome_btn.id = "gohome";

    achievement_div.appendChild(normal_div);
    achievement_div.appendChild(special_div);
    achievement_div.appendChild(hide_div);

    document.getElementById("game").appendChild(gohome_btn);
    document.getElementById("game").appendChild(achievement_div);

    // TODO

    // Test Script
    var normal_unlocked_div = document.createElement("div");
    var normal_locked_div = document.createElement("div");
    var special_unlocked_div = document.createElement("div");
    var special_locked_div = document.createElement("div");
    var hide_unlocked_div = document.createElement("div");
    // var hide_locked_div = document.createElement("div");

    normal_unlocked_div.innerText = "一般成就 已解鎖";
    normal_locked_div.innerText = "一般成就 未解鎖";
    special_unlocked_div.innerText = "特殊成就 已解鎖";
    special_locked_div.innerText = "特殊成就 未解鎖";
    hide_unlocked_div.innerText = "隱藏成就 已解鎖";
    // hide_locked_div.innerText = "隱藏成就 未解鎖";

    normal_unlocked_div.classList.add("unlocked");
    normal_locked_div.classList.add("locked");
    special_unlocked_div.classList.add("unlocked");
    special_locked_div.classList.add("locked");
    hide_unlocked_div.classList.add("unlocked");
    // hide_locked_div.classList.add("locked");

    document.getElementById("normal-area").appendChild(normal_unlocked_div);
    document.getElementById("normal-area").appendChild(normal_locked_div);
    document.getElementById("special-area").appendChild(special_unlocked_div);
    document.getElementById("special-area").appendChild(special_locked_div);
    document.getElementById("hide-area").appendChild(hide_unlocked_div);
    // document.getElementById("hide-area").appendChild(hide_locked_div);
  }


  // Game page: playing

  /**
   * 暫停遊戲
   */
  pause() {
    document.getElementById('pauseBackgroundPage').style.display = 'block';
  }

  /**
   * 檢查是否通關
   */
  submit() {
    // TODO
  }

  // Game page: pause

  /**
   * 繼續遊戲
   */
  continue() {
    document.getElementById('pauseBackgroundPage').style.display = 'none';
  }

  /**
   * 重新開始遊戲
   */
  restart() {
    document.getElementById('pauseBackgroundPage').style.display = 'none';
  }

  /**
   * 結束遊戲
   */
  exit() {
    this.gotoHome();
  }

  /**
   * 設定音量
   * @param {number} value
   */
  setVolume(value) {
    // TODO
  }


  // Setting page

  /**
   * 增加遊戲方塊數
   */
  increaseBrickCount() {
    this.brickCount++;
    document.getElementById("BrickCount").innerText = this.brickCount.toString();
  }

  /**
   * 減少遊戲方塊數
   */
  decreaseBrickCount() {
    this.brickCount--;
    document.getElementById("BrickCount").innerText = this.brickCount.toString();
  }

  /**
   * TODO
   * @param {number} textureId - TODO
   */
  setBrickTexture(textureId) {
    // TODO
  }


  // Achievement page

  /**
   * TODO
   * @param {number} achievementId - TODO
   */
  pickupGift(achievementId) { // eslint-disable-line no-unused-vars
    // TODO
  }
}

window.App = App;
