/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.bg = this.game.add.tileSprite(0,0, this.game.width, this.game.height, 'sky');
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
    this._vidas = 3
    this._score = 0
  }

  render() {
    
  }
  
  update() {
    if(this.xkey.isDown)
    {
      this.state.start('Inputw',true, false, this._vidas, this._score)
    }
  }
}
