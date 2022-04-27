import Phaser from 'phaser'

import Board from "../gameobjects/board"

export default class mainGame extends Phaser.Scene {
    constructor() {
        super('mainGame')
    }

    create() {
        const { width, height } = this.scale
        let board = new Board(this, 8, 10)
        let rect = board.getBounds()
        let currenth = rect.height
        board.setScale(Math.min(width, height) / currenth)

        this.add.existing(board)

        this.input.mouse.disableContextMenu()

    }

    createRestart() {
        let button = this.add.image(this.scale.width / 2, this.scale.height / 2, 'restart')
            .setInteractive()
        button.on('pointerup', () => {
            this.scene.restart()
        })
    }

}