export default class mainGame extends Phaser.Scene {
constructor(){
    super('prelaod')
}
preload() {
     
    this.load.image('background', 'assets/background.jpg')
    this.load.image('restart', 'assets/restart.png')

    this.load.atlas('main', 'assets/texture.png', 'assets/texture_atlas.json')

}
create(){
    this.scene.start('mainGame')
}
}