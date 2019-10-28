/* eslint-disable no-new */
import Phaser from 'phaser'
import config from './config'

class Game extends Phaser.Game {
  constructor () {
    super(config, Phaser.AUTO)

    this.scene.start('StartScreen')
  }
}
