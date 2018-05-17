/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    const bannerText = 'Press X to starT'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      align:'center',
      smoothed: false
    })
    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)
    this.xkey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT]);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
  
  update() {
    if(this.xkey.isDown)
    {
      this.state.start('Inputw')
    }
  }
}
