import { Game } from 'game'

class App { // eslint-disable-line no-unused-vars
	/**
	 * 初始化App
	 * @param {number} pageState - 頁面狀態
	 */
	constructor(pageState) {
		this.pageState = pageState;
		this.game = Game();
	}

	// Home page

	start() {
		// TODO
	}

	gotoSetting() {
		// TODO
	}

	gotoAchievement() {
		// TODO
	}


	// Game page: playing

	pause() {
		// TODO
	}

	submit() {
		// TODO
	}

	// Game page: pause

	continue() {
		// TODO
	}

	restart() {
		// TODO
	}

	exit() {
		// TODO
	}

	setVolume() {
		// TODO
	}


	// Setting page

	increaseBrickCount() {
		// TODO
	}

	decreaseBrickCount() {
		// TODO
	}

	/**
	 * TODO
	 * @param {number} textureId - TODO
	 */
	useTexture(textureId) { // eslint-disable-line no-unused-vars
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
