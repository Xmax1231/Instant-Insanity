class Achievement { // eslint-disable-line no-unused-vars
	/**
	 * 初始化成就
	 * @param {boolean} taken - 是否已領取
	 */
	constructor(taken) {
		this.taken = taken;
	}
}


/**
 * 成就類型
 * @enum {number}
 */
const AchievementType = { // eslint-disable-line no-unused-vars
	NORMAL: 0, // 一般
	SPECAIL: 1, // 特殊
	HIDDEN: 2, // 隱藏
}
