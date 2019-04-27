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
    this.brickCount = 0; // TODO
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
    var start_btm = document.createElement("button");
    var setting_btm = document.createElement("button");
    var achievement_btm = document.createElement("button");

    start_btm.onclick = () => {app.start();};
    setting_btm.onclick = () => {app.gotoSetting();};
    achievement_btm.onclick = () => {app.gotoAchievement();};

    home_div.id = "home";
    icon_div.id = "icon-area";
    start_btm.id = "start";
    setting_btm.id = "gotoSetting";
    achievement_btm.id = "gotoAchievement";

    start_btm.innerText = "開始";
    setting_btm.innerText = "設定";
    achievement_btm.innerText = "稱號";

    home_div.appendChild(icon_div);
    home_div.appendChild(start_btm);
    home_div.appendChild(setting_btm);
    home_div.appendChild(achievement_btm);

    document.getElementById("game").appendChild(home_div);
  }

  /**
   * 開始遊戲
   */
  start() {
    this.clearPage();
    var play_div = document.createElement("div");
    var pause_btm = document.createElement("button");
    var submit_btm = document.createElement("button");
    var canvas_div = document.createElement("div");
    var time_div = document.createElement("div");
    var move_div = document.createElement("div");
    var pauseBackgroundPage_div = document.createElement("div");
    var pausePage_div = document.createElement("div");
    var continue_btm = document.createElement("button");
    var restart_btm = document.createElement("button");
    var exit_btm = document.createElement("button");

    pause_btm.onclick = () => {app.pause();};
    submit_btm.onclick = () => {app.submit();};
    continue_btm.onclick = () => {app.continue();};
    restart_btm.onclick = () => {app.restart();};
    exit_btm.onclick = () => {app.exit();};
    
    play_div.id = "play";
    pause_btm.id = "pause";
    submit_btm.id = "submit";
    canvas_div.id = "canvas-area";
    time_div.id = "time";
    move_div.id = "move";
    pauseBackgroundPage_div.id = "pauseBackgroundPage";
    pausePage_div.id = "pausePage";
    continue_btm.id = "continue";
    restart_btm.id = "restart";
    exit_btm.id = "exit";
    
    submit_btm.innerText = "submit";
    time_div.innerText = "time:00.00";
    move_div.innerText = "move:0";
    continue_btm.innerText = "繼續遊戲";
    restart_btm.innerText = "重新遊戲";
    exit_btm.innerText = "結束遊戲";

    play_div.appendChild(pause_btm);
    play_div.appendChild(submit_btm);
    play_div.appendChild(canvas_div);
    play_div.appendChild(time_div);
    play_div.appendChild(move_div);
    pauseBackgroundPage_div.appendChild(pausePage_div);
    pauseBackgroundPage_div.appendChild(continue_btm);
    pauseBackgroundPage_div.appendChild(restart_btm);
    pauseBackgroundPage_div.appendChild(exit_btm);

    document.getElementById("game").appendChild(play_div);
    document.getElementById("game").appendChild(pauseBackgroundPage_div);
  }

  /**
   * 前往設定頁
   */
  gotoSetting() {
    // TODO
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
    // TODO
  }

  /**
   * 減少遊戲方塊數
   */
  decreaseBrickCount() {
    // TODO
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
