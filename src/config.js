import Phaser from 'phaser'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'

const config = {
  width: '100%',
  height: '100%',
  localStorageName: 'phaseres6webpack',
  webfonts: ['Bangers'],
  scene: [Game, GameOver]
}

new Phaser.Game(config)
