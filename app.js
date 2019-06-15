import { Game } from './game.js';
import { Displayer, Displayer4BrickStyle } from './displayer.js';
import { SelectorBrick } from './brick.js';
import { MaterialManager } from './material.js';


const STORAGEKEY = 'InsanityCannabisData';

/**
 * 控制遊戲畫面
 */
class App {
  /**
   * 初始化App
   */
  constructor(bgm_player) {
    this.materialManager = new MaterialManager([{
          type: MaterialManager.BACKGROUND,
          label: 'bg-sky',
        }, {
          type: MaterialManager.BACKGROUND,
          label: 'bg-02',
        }, {
          type: MaterialManager.BACKGROUND,
          sameWall: true,
          label: 'bg-03',
        }, {
          type: MaterialManager.BACKGROUND,
          sameWall: true,
          label: 'bg-04',
        }, {
          type: MaterialManager.BACKGROUND,
          sameWall: true,
          label: 'bg-04-1',
        }, {
          type: MaterialManager.BACKGROUND,
          sameWall: true,
          label: 'bg-04-2',
        }, {
          type: MaterialManager.BACKGROUND,
          sameWall: true,
          label: 'bg-04-3',
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: 'dice',
          length: 8,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '01',
          length: 8,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '02',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '03',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '04',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '05',
          length: 7,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '06',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '07',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '08-octangle-full',
          length: 8,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '09',
          length: 7,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '10',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '11-octangle-transparet',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '12',
          length: 7,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '13',
          length: 8,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '14',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '15',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '16',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '17',
          length: 8,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '18',
          length: 8,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '19',
          length: 8,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '20',
          length: 9,
        }, {
          type: MaterialManager.BRICKSTYLE,
          label: '21',
          length: 9,
        },
      ])
    this.displayer = new Displayer(document.getElementById('render'));
    this.displayer4BrickStyle = new Displayer4BrickStyle(null);
    this.brickCount = 4;
    this.materialName = '08-octangle-full';
    this.backgroundMaterialName = 'bg-sky';
    this.game = null;
    this.volume = 75;
    this.bgm_player = bgm_player;
    this.loadData();
    let facePattern = { top: 0, bottom: 1, front: 2, back: 3, right: 4, left: 5 }
    this.brickStyles = this.materialManager.brickStyles.map(n => new SelectorBrick(this, facePattern, n))
    this.displayer4BrickStyle.setBrickSelectors(this.brickStyles)
    this.changeBackground()
  }

  changeBackground(label) {
    this.displayer.scene.background =
    this.displayer4BrickStyle.scene.background =
    this.materialManager.get(label || this.backgroundMaterialName)
  }

  displayBrickStyle(appElem) {
    this.displayer4BrickStyle.applyContainer(appElem)
    this.displayer4BrickStyle.resize()
    Object.assign(this.displayer4BrickStyle.cameraInfo, {
      r: 8,
      theta: this.displayer4BrickStyle.selectorBrickStartY,
      phi: .5,
    })
    this.displayer4BrickStyle.calcCamera()
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
    this.bgm_player.playVideo();
  }

  /**
   * 前往遊戲首頁
   */
  gotoHome() {
    this.clearPage();
    this.displayer.display(Displayer.BACKGROUND)
    this.displayer4BrickStyle.display(Displayer.BACKGROUND)
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
    achievement_btn.style = "display: none"; // Temporary

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
    this.displayer4BrickStyle.display(Displayer.GAMMING)
    var play_div = document.createElement("div");
    var pause_btn = document.createElement("button");
    var submit_btn = document.createElement("button");
    var tip_btn = document.createElement("button");
    // var canvas_div = document.createElement("div");
    var timemoveblock_div = document.createElement("div");
    var time_div = document.createElement("div");
    var time_lb = document.createElement("span");
    var time_num = document.createElement("span");
    this.time_num = time_num; // For other functions access
    var move_div = document.createElement("div");
    var move_lb = document.createElement("span");
    var move_num = document.createElement("span");
    this.move_num = move_num; // For other functions access
    var pauseBackgroundPage_div = document.createElement("div");
    var pausePage_div = document.createElement("div");
    var continue_btn = document.createElement("button");
    var restart_btn = document.createElement("button");
    var exit_btn = document.createElement("button");
    var volumeSetting_div = document.createElement("div");
    var volume_icon = document.createElement("div");
    var volume_ipt = document.createElement("input");
    var output_div = document.createElement("div");
    var bgmCredit_div = document.createElement("div");
    var bgmCreditText = document.createTextNode("現在播放：");
    var bgmCreditLink = document.createElement("a");

    pause_btn.onclick = () => { this.pause(); };
    submit_btn.onclick = () => { this.submit(); };
    tip_btn.onclick = () => { this.tip(); };
    continue_btn.onclick = () => { this.continue(); };
    restart_btn.onclick = () => { this.restart(); };
    exit_btn.onclick = () => { this.exit(); };
    volume_ipt.oninput = () => {
      this.setVolume(volume_ipt.value);
    };

    play_div.id = "play";
    pause_btn.id = "pause";
    submit_btn.id = "submit";
    tip_btn.id = "tip";
    // canvas_div.id = "canvas-area";
    timemoveblock_div.id = "timemoveblock";
    time_div.id = "time";
    time_lb.id = "time_lb";
    time_num.id = "time_num";
    move_div.id = "move";
    move_lb.id = "move_lb";
    move_num.id = "move_num";
    pauseBackgroundPage_div.id = "pauseBackgroundPage";
    pausePage_div.id = "pausePage";
    continue_btn.id = "continue";
    restart_btn.id = "restart";
    exit_btn.id = "exit";
    volumeSetting_div.id = "volumeSetting";
    volume_icon.id = "volume_icon";
    volume_ipt.id = "volume";
    output_div.id = "output";
    bgmCredit_div.id = "bgmCredit";
    bgmCreditLink.id = "bgmCreditLink";
    bgmCreditLink.href = `https://youtu.be/${this.bgm_player.getVideoData().video_id}`;
    bgmCreditLink.target = "_blank";
    bgmCreditLink.innerText = this.bgm_player.getVideoData().title;

    time_lb.classList.add("lb");
    time_num.classList.add("num");
    move_lb.classList.add("lb");
    move_num.classList.add("num");

    submit_btn.innerText = "submit";
    tip_btn.innerText = "tip";
    time_lb.innerText = "time:";
    time_num.innerText = "12345"
    move_lb.innerText = "move:";
    move_num.innerText = "0";
    continue_btn.innerText = "繼續遊戲";
    restart_btn.innerText = "重新遊戲";
    exit_btn.innerText = "結束遊戲";
    output_div.innerText = this.volume.toString();

    volume_ipt.type = "range";
    volume_ipt.min = "0";
    volume_ipt.max = "100";
    volume_ipt.value = this.volume.toString();

    play_div.appendChild(submit_btn);
    play_div.appendChild(tip_btn);
    // play_div.appendChild(canvas_div);
    play_div.appendChild(timemoveblock_div);
    play_div.appendChild(pause_btn);
    timemoveblock_div.appendChild(time_div);
    timemoveblock_div.appendChild(move_div);
    time_div.appendChild(time_lb);
    time_div.appendChild(time_num);
    move_div.appendChild(move_lb);
    move_div.appendChild(move_num);
    pauseBackgroundPage_div.appendChild(pausePage_div);
    pausePage_div.appendChild(continue_btn);
    pausePage_div.appendChild(restart_btn);
    pausePage_div.appendChild(exit_btn);
    pausePage_div.appendChild(volumeSetting_div);
    volumeSetting_div.appendChild(volume_icon);
    volumeSetting_div.appendChild(volume_ipt);
    volumeSetting_div.appendChild(output_div);
    pausePage_div.appendChild(bgmCredit_div);
    bgmCredit_div.appendChild(bgmCreditText);
    bgmCredit_div.appendChild(bgmCreditLink);

    pauseBackgroundPage_div.style.display = "none";

    document.getElementById("game").appendChild(play_div);
    document.getElementById("game").appendChild(pauseBackgroundPage_div);

    this.timeInt = setInterval(() => {
      time_num.innerText = Math.floor(this.game.getTime());
    }, 100);

    let game_div = document.createElement('div');
    game_div.style = 'position: absolute; top: 5%; left: 10%; background: rgba(128, 128, 128, 0.5); display: none;';

    let brick_table = document.createElement('table');

    let createBrick = (brickId, face) => {
      let brick = document.createElement('div');
      brick.id = 'brick' + brickId + face;
      if (face == 'top' || face == 'bottom') {
        brick.className = 'facetop';
      } else {
        brick.className = 'faceside';
      }
      return brick;
    }

    for (let brickId = 0; brickId < this.brickCount; brickId++) {
      // top
      let tr_top = document.createElement('tr');
      let td_top = document.createElement('td');
      td_top.colSpan = 4;
      td_top.style = 'text-align: center;';
      td_top.appendChild(createBrick(brickId, 'top'));
      tr_top.appendChild(td_top);
      brick_table.appendChild(tr_top);
      // side
      let tr_side = document.createElement('tr');
      ['left', 'front', 'right', 'back'].forEach(face => {
        let td_side = document.createElement('td');
        td_side.appendChild(createBrick(brickId, face));
        tr_side.appendChild(td_side);
      });
      brick_table.appendChild(tr_side);
      // bottom
      let tr_bottom = document.createElement('tr');
      let td_bottom = document.createElement('td');
      td_bottom.colSpan = 4;
      td_bottom.style = 'text-align: center;';
      td_bottom.appendChild(createBrick(brickId, 'bottom'));
      tr_bottom.appendChild(td_bottom);
      brick_table.appendChild(tr_bottom);
    }

    game_div.appendChild(brick_table);

    this.draw = () => {
      for (let bid = 0; bid < this.brickCount; bid++) {
        ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(face => {
          const el = document.getElementById('brick' + bid + face);
          for (let bid2 = 1; bid2 <= this.brickCount; bid2++) {
            el.classList.remove('face' + bid2);
          }
          el.classList.add('face' + this.game.bricks[bid].facePattern[face]);
        });
      }
    }

    document.getElementById("game").appendChild(game_div);
    this.draw();
  }

  updateMove() {
    this.move_num.innerText = this.game.getStepFormatted();
  }

  /**
   * 前往設定頁
   */
  gotoSetting() {
    this.clearPage();
    // this.displayer.display(Displayer.SELECTING)
    this.displayer4BrickStyle.display(Displayer.SELECTING)
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
    // increaseBrickCount_div.innerHTML = "+";
    // decreaseBrickCount_div.innerHTML = "-";
    BrickCount_div.innerText = this.brickCount.toString();

    brickNumSetting_div.appendChild(brickNumTXT_div);
    brickNumSetting_div.appendChild(decreaseBrickCount_div);
    brickNumSetting_div.appendChild(BrickCount_div);
    brickNumSetting_div.appendChild(increaseBrickCount_div);
    brickStyleSetting_div.appendChild(brickStyleTXT_div);
    brickStyleSetting_div.appendChild(brickShow_div);
    // setting_div.appendChild(document.createElement('div')).innerHTML = `<div style="font-size: 16px">Backgrounds: ` + this.materialManager.backgrounds.map(l => `<a onclick="app.changeBackground('${l}')" href="javascript:">[${l}]</a>`).join(':') + `</div>`
    setting_div.appendChild(brickNumSetting_div);
    setting_div.appendChild(brickStyleSetting_div);

    document.getElementById("game").appendChild(gohome_btn);
    document.getElementById("game").appendChild(setting_div);
    this.displayBrickStyle(brickShow_div);
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
    this.game.pause();
    document.getElementById('pauseBackgroundPage').style.display = 'block';
  }

  /**
   * 檢查是否通關
   * @todo 應該要顯示結算畫面，尚未完成，暫時直接開始新遊戲
   */
  submit() {
    if (this.game.isResolve()) {
      clearInterval(this.timeInt);
      alert('Mission clear! Starting a new game.');
      this.start(); // Temporary
    } else {
      alert('Not yet');
    }
  }

  /**
   * 顯示提示
   */
  tip() {
    let tip = this.game.getAnswer();
    if (tip.length == 0) {
      alert('沒有更多提示了');
    } else {
      this.game.showTip(tip[0]);
    }
  }

  // Game page: pause

  /**
   * 繼續遊戲
   */
  continue() {
    this.game.start();
    document.getElementById('pauseBackgroundPage').style.display = 'none';
  }

  /**
   * 重新開始遊戲
   * @todo 應該為同一關卡重新開始，尚未完成
   */
  restart() {
    this.game.restart();
    document.getElementById('pauseBackgroundPage').style.display = 'none';
    this.time_num.innerText = 0;
    this.move_num.innerText = 0;
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
    document.getElementById("output").innerHTML = value;
    this.volume = value;
    this.bgm_player.setVolume(value);
    this.storeData();
  }


  // Setting page

  /**
   * 增加遊戲方塊數，上限為8個
   */
  increaseBrickCount() {
    if (this.brickCount >= 8) {
      alert('上限為8個方塊');
      return;
    }
    this.brickCount++;
    document.getElementById("BrickCount").innerText = this.brickCount.toString();
    this.storeData();
  }

  /**
   * 減少遊戲方塊數，下限為2個
   */
  decreaseBrickCount() {
    if (this.brickCount <= 2) {
      alert('下限為2個方塊');
      return;
    }
    this.brickCount--;
    document.getElementById("BrickCount").innerText = this.brickCount.toString();
    this.storeData();
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
  pickupGift(achievementId) {
    // TODO
  }


  // Other

  /**
   * 儲存資料到localStorage
   */
  storeData() {
    let data = {};
    data.brickCount = this.brickCount;
    data.materialName = this.materialName;
    data.volume = this.volume;
    localStorage.setItem(STORAGEKEY, JSON.stringify(data));
  }

  /**
   * 從localStorage擷取資料
   */
  loadData() {
    let data = localStorage.getItem(STORAGEKEY);
    if (data === null) {
      return;
    }
    try {
      data = JSON.parse(data);
    } catch (error) {
      return;
    }
    if (data.brickCount !== undefined) {
      this.brickCount = data.brickCount;
    }
    if (data.materialName !== undefined) {
      this.materialName = data.materialName;
    }
    if (data.volume !== undefined) {
      this.volume = data.volume;
    }
  }
}

window.App = App;
