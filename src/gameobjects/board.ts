import Phaser from "phaser";
import Cell from "../gameobjects/cell"
import mainGame from "../scenes/mainGame";

export default class Board extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, n: number, bee_count: number) {
        super(scene, 0, 0)
        this.n = n
        for (let i = 0; i < this.n; i++)
            for (let j = 0; j < this.n; j++) {
                let new_cell = new Cell(scene, i * this.cell_size, j * this.cell_size, this.cell_size, this)
                new_cell.setBoardPosition(i, j)
                this.add(new_cell)
            }

        this.spapwn_bee(bee_count)

    }

    n: number = 8
    cell_size: number = 10

    in_progress: boolean = true

    spapwn_bee(n: number) {
        let bee_count = 0
        while (bee_count < n) {
            let not_bee = this.list.filter((c) => {
                let cell = c as Cell
                return !(cell.is_bee)
            })
            let r_cell = Phaser.Utils.Array.GetRandom(not_bee)
            bee_count++
            r_cell.is_bee = true

        }

    }
    check_bees(x:number, y:number){
        return this.get_neighbors(x, y).filter((c)=>{
            let cell = c as Cell
            return cell.is_bee
        }).length
        
    }
    check_flags(x:number, y:number){
        return this.get_neighbors(x, y).filter((c)=>{
        let cell = c as Cell
        return cell.is_flag
    }).length
        
    }
    get_neighbors(x: number, y: number) {
        let startx = Math.max(0, x - 1)
        let starty = Math.max(0, y - 1)
        let endx = Math.min(this.n-1, x + 1)
        let endy = Math.min(this.n-1, y + 1)
        let neighbors = []
        for (let i = startx; i <= endx; i++)
            for (let j = starty; j <= endy; j++) {
                if (i == x && j == y) continue

                let index = this.get_index(i,j)
                neighbors.push(this.list[index])
            }
        return neighbors    
    }

    find_zeros(x: number, y: number){
        let neighbors = this.get_neighbors(x, y)
        neighbors.forEach((e)=>{
            let cell = e as Cell
            if (!cell.is_bee)
            {
                cell.reveal()
            }
        })
        
    }

    open_neighbors(x: number, y: number){
        let neighbors = this.get_neighbors(x, y)
        let bee_count = this.check_bees(x, y)
        let flag_count = this.check_flags(x, y)

        if (flag_count >= bee_count){
            neighbors.forEach((c)=>{
                let cell = c as Cell
                if (!cell.is_flag && !cell.is_revealed)
                {
                    cell.reveal()
                }
            })
        }
    }

    get_index(x: number, y: number)
    {
        return x*this.n + y
    }

    lost_game()
    {
        this.in_progress = false
        this.list.filter((e)=>{
            let cell = e as Cell
            return cell.is_bee
        }).forEach((e)=>{
            let cell = e as Cell
            cell.reveal()
        })
        let currentScene = this.scene as mainGame
        currentScene.createRestart()

    }


}