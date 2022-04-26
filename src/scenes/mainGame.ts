import Phaser from 'phaser'

import Board from "../gameobjects/board"

export default class mainGame extends Phaser.Scene {
    constructor() {
        super('mainGame')
    }

    create() {
        const { width, height } = this.scale
        this.add.tileSprite(0, 0, width, height, 'background')
            .setOrigin(0)
            .setTileScale(0.4)
            .setTint(0xDFF5CE)

        let board = new Board(this, 100, 30)
        let rect = board.getBounds()
        let currenth = rect.height
        board.setScale(540 / currenth)

        this.add.existing(board)

        this.input.mouse.disableContextMenu()

    }

    createRestart() {
        let button = this.add.image(this.scale.width / 2, this.scale.height / 2, 'restart')
            .setInteractive()
        button.on('pointerdown', () => {
            this.scene.restart()
        })
    }

}