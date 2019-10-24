/* eslint-disable no-new */
import Phaser from 'phaser'
import GameState from './GameState'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.scene.add('Game', new GameState(), false)
    this.state.start('Game')
  }
}

new Phaser.Game(config)
