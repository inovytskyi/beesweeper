export default class preloadScene extends Phaser.Scene {
constructor(){
    super('prelaod')
}
preload() {
    let box = this.add.graphics()
    let bar = this.add.graphics();

    box.fillStyle(0x222222, 0.8)
    box.fillRect(240, 270, 320, 50)

    this.load.on('progress', (value:number)=> {
        bar.clear()
        bar.fillStyle(0xffffff, 1)
        bar.fillRect(250, 280, 300 * value, 30)
    })
     
    this.load.image('background', "assets/background.jpg")
    this.load.image('restart', 'assets/restart.png')

    this.load.atlas('main', 'assets/texture.png', 'assets/texture_atlas.json')

}
create(){
    this.scene.start('mainGame')
}
}