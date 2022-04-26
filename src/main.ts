import Phaser from 'phaser'

import mainGame from './scenes/mainGame'
import preloadScene from './scenes/preloadScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [preloadScene,mainGame]
}

export default new Phaser.Game(config)