import Phaser from "phaser";
import Board from "./board";

export default class Cell extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, size: number, parent: Board) {
        super(scene, x, y, 'main', 'closed')
        this.setOrigin(0)
        this.setDisplaySize(size, size)
        this.setInteractive()
        // this.on('pointerover', ()=>this.turnOn())
        // this.on('pointerout',()=>this.turnOff())
        this.on('pointerdown', (event: Phaser.Input.Pointer) => this.onClickHandler(event))
        this.parent = parent

    }
    posX: number = 0
    posY: number = 0
    parent: Board
    is_revealed = false
    is_bee = false
    is_flag = false
    lastClick = false

    setBoardPosition(x: number, y: number) {
        this.posX = x;
        this.posY = y;
    }

    turnOn() {
        this.setTint(0xffaaaa)
    }
    turnOff() {
        this.clearTint()
    }

    reveal() {
        if (!this.is_revealed) {
            this.is_revealed = true
            this.is_flag = false
            if (this.is_bee) {

                this.setFrame('bee')
                if (this.parent.in_progress) {
                    this.parent.lost_game()
                    this.setFrame('gameover')
                }
            }
            else {

                let n = this.parent.check_bees(this.posX, this.posY)
                this.setFrame('cell' + n)

                if (n == 0) this.parent.find_zeros(this.posX, this.posY)

            }
        }
        else {
            if (!this.lastClick) {
                this.lastClick = true
                this.scene.time.delayedCall(300, () => this.lastClick = false)

            } else {
                this.parent.open_neighbors(this.posX, this.posY)
            }

        }
    }

    flag() {
        if (!this.is_revealed) {
            this.is_flag = !this.is_flag
            if (this.is_flag) {
                this.setFrame('flag')
            } else {
                this.setFrame('closed')
            }

        } 
    }

    onClickHandler(event: Phaser.Input.Pointer) {
        if (this.parent.in_progress) {
            if (event.leftButtonDown()) {
                if (!this.lastClick) {
                    this.lastClick = true
                    this.scene.time.delayedCall(300, () => {
                        this.lastClick = false
                        this.flag()
                    })

                } else {
                    this.reveal()
                }


            }
        }


    }

}