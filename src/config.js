/* eslint-disable */
import Phaser from 'phaser'
import Game from './scenes/Game'

const config = {
  width: '100%',
  height: '100%',
  localStorageName: 'phaseres6webpack',
  webfonts: ['Bangers'],
  scene: [Game]
}

new Phaser.Game(config)
