import {Game} from './game.js';
import {Displayer} from './displayer.js';

/**
 * 控制遊戲畫面
 */
class App { // eslint-disable-line no-unused-vars
  /**
   * 初始化App
   */
  constructor() {
    this.displayer = new Displayer(null); // TODO
    this.brickCount = 4; // TODO
    this.game = new Game();
    this.volume = 1;
    this.bgm = null; // TODO
  }

  // Home page

  /**
   * 清除畫面
   */
  clearPage(){
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
    var home_div = document.createElement("div");
    var icon_div = document.createElement("div");
    var start_btn = document.createElement("button");
    var setting_btn = document.createElement("button");
    var achievement_btn = document.createElement("button");

    start_btn.onclick = () => {app.start();};
    setting_btn.onclick = () => {app.gotoSetting();};
    achievement_btn.onclick = () => {app.gotoAchievement();};

    home_div.id = "home";
    icon_div.id = "icon-area";
    start_btn.id = "start";
    setting_btn.id = "gotoSetting";
    achievement_btn.id = "gotoAchievement";

    start_btn.innerText = "開始";
    setting_btn.innerText = "設定";
    achievement_btn.innerText = "稱號";

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
    var play_div = document.createElement("div");
    var pause_btn = document.createElement("button");
    var submit_btn = document.createElement("button");
    var canvas_div = document.createElement("div");
    var time_div = document.createElement("div");
    var move_div = document.createElement("div");
    var pauseBackgroundPage_div = document.createElement("div");
    var pausePage_div = document.createElement("div");
    var continue_btn = document.createElement("button");
    var restart_btn = document.createElement("button");
    var exit_btn = document.createElement("button");

    pause_btn.onclick = () => {app.pause();};
    submit_btn.onclick = () => {app.submit();};
    continue_btn.onclick = () => {app.continue();};
    restart_btn.onclick = () => {app.restart();};
    exit_btn.onclick = () => {app.exit();};
    
    play_div.id = "play";
    pause_btn.id = "pause";
    submit_btn.id = "submit";
    canvas_div.id = "canvas-area";
    time_div.id = "time";
    move_div.id = "move";
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

    play_div.appendChild(pause_btn);
    play_div.appendChild(submit_btn);
    play_div.appendChild(canvas_div);
    play_div.appendChild(time_div);
    play_div.appendChild(move_div);
    pauseBackgroundPage_div.appendChild(pausePage_div);
    pauseBackgroundPage_div.appendChild(continue_btn);
    pauseBackgroundPage_div.appendChild(restart_btn);
    pauseBackgroundPage_div.appendChild(exit_btn);

    document.getElementById("game").appendChild(play_div);
    document.getElementById("game").appendChild(pauseBackgroundPage_div);
  }

  /**
   * 前往設定頁
   */
  gotoSetting() {
    this.clearPage();
    var setting_div = document.createElement("div");
    var brickNumSetting_div = document.createElement("div");
    var brickStyleSetting_div = document.createElement("div");
    var brickNumTXT_div = document.createElement("div");
    var increaseBrickCount_div = document.createElement("button");
    var BrickCount_div = document.createElement("div");
    var decreaseBrickCount_div = document.createElement("button");
    var brickStyleTXT_div = document.createElement("div");
    var brickShow_div = document.createElement("div");
    
    increaseBrickCount_div.onclick = () => {app.increaseBrickCount();};
    decreaseBrickCount_div.onclick = () => {app.decreaseBrickCount();};

    setting_div.id = "setting";
    brickNumSetting_div.id = "brickNumSetting";
    brickStyleSetting_div.id = "brickStyleSetting";
    brickNumTXT_div.id = "brickNumTXT";
    increaseBrickCount_div.id = "increaseBrickCount";
    BrickCount_div.id = "BrickCount";
    decreaseBrickCount_div.id = "decreaseBrickCount";
    brickStyleTXT_div.id = "brickStyleTXT";
    brickShow_div.id = "brickShow";
    
    brickNumTXT_div.innerText = "方塊數：";
    brickStyleTXT_div.innerText = "方塊樣式：";
    BrickCount_div.innerText = this.brickCount.toString();

    brickNumSetting_div.appendChild(brickNumTXT_div);
    brickNumSetting_div.appendChild(increaseBrickCount_div);
    brickNumSetting_div.appendChild(BrickCount_div);
    brickNumSetting_div.appendChild(decreaseBrickCount_div);
    brickStyleSetting_div.appendChild(brickStyleTXT_div);
    brickStyleSetting_div.appendChild(brickShow_div);
    setting_div.appendChild(brickNumSetting_div);
    setting_div.appendChild(brickStyleSetting_div);
    
    document.getElementById("game").appendChild(setting_div);
  }

  /**
   * 前往成就頁
   */
  gotoAchievement() {
    // TODO
  }


  // Game page: playing

  /**
   * 暫停遊戲
   */
  pause() {
    document.getElementById('pauseBackgroundPage').style.display='block';
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
    document.getElementById('pauseBackgroundPage').style.display='none';
  }

  /**
   * 重新開始遊戲
   */
  restart() {
    document.getElementById('pauseBackgroundPage').style.display='none';
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
