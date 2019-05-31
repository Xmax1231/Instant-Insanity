const ACHIEVEMENTEVENT = {
  MOVE_CHANGED: 1,
  ROTATE_BRICK: 2,
  CHECK_ANSWER: 3,
}

/**
 * 成就管理器
 */
class AchievementManager {
  constructor() {
    this.listeners = {};
    for (let event in ACHIEVEMENTEVENT) {
      this.listeners[ACHIEVEMENTEVENT[event]] = [];
    }
  }

  addAchievement(achievementEntry) {
    achievementEntry.event.forEach(event => {
      this.listeners[event].push(achievementEntry);
    });
  }

  triggerEvent(event, value) {
    this.listeners[event].forEach(achievementEntry => {
      achievementEntry.eventListener(event, value);
    });
  }
}

/**
 * 成就項目
 */
class AchievementEntry {
  /**
   * 初始化成就
   * @param {string} achieveMessage - 達成成就後的通知訊息
   */
  constructor(event, achieveMessage) {
    this.event = event;
    this.achieveMessage = achieveMessage;
  }

  eventListener(type, value) {
    throw Error('Not implemented');
  }

  achieve() {
    alert(this.achieveMessage);
  }
}

export { AchievementManager, AchievementEntry, ACHIEVEMENTEVENT }
