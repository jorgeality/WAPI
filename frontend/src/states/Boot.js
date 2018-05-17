import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config';
import apiservice from './apiservice'

export default class extends Phaser.State {
  init() {
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.stage.backgroundColor = '#ffffff'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
     
  }

  preload() {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      })
      this.game.load.image('sky', './assets/images/sky-2x.png')
      this.game.load.json('ataques', 'http://127.0.0.1:5000/api/v1/palabras/categorias/1')
      this.game.load.json('curas','http://127.0.0.1:5000/api/v1/palabras/categorias/0')
    }

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    
  }

  create(){
    this.bg = this.game.add.tileSprite(0,0, 1000, 1000, 'sky');
  }
  render() {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Splash')
    }
    if (!config.webfonts.length) {
      this.state.start('Splash')
    }
  }

  fontsLoaded() {
    this.fontsReady = true
  }
}
