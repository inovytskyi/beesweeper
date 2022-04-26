import Phaser from 'phaser'

import mainGame from './scenes/mainGame'
import preloadScene from './scenes/preloadScene'

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
let size = Math.min(windowHeight, windowWidth) - 10
const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: size,
	height: size,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [preloadScene, mainGame]
}

export default new Phaser.Game(config)