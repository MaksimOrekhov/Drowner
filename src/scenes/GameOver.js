import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver')

  }

  init () {

  }

  preload () {

  }

  create () {
    this.add.text(100, 100, 'GAME OVER. Your pet is dead.', {
      font: '40px Bangers',
      fill: '#7744ff'
    })
  }

  update () {

  }
}
