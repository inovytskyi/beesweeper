import Phaser from "phaser";
import Board from "./board";

export default class Cell extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, size: number, parent: Board) {
        super(scene, x, y, 'main', 'closed')
        this.setOrigin(0)
        this.setDisplaySize(size, size)
        this.setInteractive()
        this.on('pointerup', (pointer: Phaser.Input.Pointer) => this.onUpHandler(pointer))
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

    reveal(clicked: boolean) {
        if ((!this.is_revealed && !this.is_flag)||(!this.is_revealed && !clicked)) {
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


    onClickAction() {
        this.reveal(true)
    }

    onDoubleClickAction() {
        if (this.is_revealed) {
            this.parent.open_neighbors(this.posX, this.posY)
        } else this.flag()
    }

    onUpHandler(pointer: Phaser.Input.Pointer) {
        if (pointer.leftButtonReleased()) {
            let holdTime: number = pointer.upTime - pointer.downTime
            if (!this.lastClick) {
                this.lastClick = true
                this.scene.time.delayedCall(300, () => {
                    if (this.lastClick) {
                        if (holdTime > 300) {
                            this.onDoubleClickAction()
                        } else
                            this.onClickAction()
                    }
                    this.lastClick = false
                })

            } else {
                this.lastClick = false
                this.onDoubleClickAction()
            }


        }

    }

}