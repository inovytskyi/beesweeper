import Phaser from 'phaser'

import Board from "../gameobjects/board"

export default class mainGame extends Phaser.Scene {
    constructor() {
        super('mainGame')


    }

    init(data:any)
    {
        if ('x' in data)
        {
            this.startX = data.x
            this.startY = data.y
        }

    }

    startX: number = -1
    startY: number = -1 
    create() {
        const { width, height } = this.scale
        let board = new Board(this, 8, 10)
        let rect = board.getBounds()
        let currenth = rect.height
        board.setScale(Math.min(width, height) / currenth)

        this.add.existing(board)
        if(this.startX != -1){
            board.firstMove(this.startX, this.startY)
        }

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