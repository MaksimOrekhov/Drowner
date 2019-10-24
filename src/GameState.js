import Phaser from 'phaser'

export default class GameState extends Phaser.Scene {
  constructor () {
    super('GameState')
  }

  init () {

  }

  preload () {

  }

  create () {
    this.add.text(20, 20, '...Loading holy fucking awesome game')
  }

  update () {

  }
}
