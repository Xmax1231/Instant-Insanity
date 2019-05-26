/**
 * 成就
 */
class AchievementEntry {
  /**
   * 初始化成就
   * @param {number} type
   * @param {string} description
   * @param {number} gifts
   * @param {boolean} unlocked
   * @param {boolean} hasGift
   */
  constructor(type, description, gifts, unlocked, hasGift) {
    this.description = description;
    this.gifts = gifts;
    this.unlocked = unlocked;
    this.hasGift = hasGift;
  }
}

AchievementEntry.NORMAL = 0; // 一般
AchievementEntry.SPECAIL = 1; // 特殊
AchievementEntry.HIDDEN = 2; // 隱藏
