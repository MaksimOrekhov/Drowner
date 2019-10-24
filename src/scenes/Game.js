import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  constructor () {
    super('Game')
    this.petAge = 0
    this.growthStages = [
      { age: 0, key: 'child' },
      { age: 1, key: 'teenager' },
      { age: 3, key: 'grownUp' },
      { age: 6, key: 'death' },
    ]
  }

  init () {

  }

  preload () {
    this.load.image('child', '../assets/images/mushroom2.png')
    this.load.image('teenager', '../assets/images/icon-192px.png')
    this.load.image('grownUp', '../assets/images/icon-512px.png')
    this.load.image('death', '../assets/images/phaser.png')
  }

  create () {
    this.time.addEvent({ delay: 3000, callback: this.updateAge, callbackScope: this, loop: true })
    this.add.image(400, 400, 'child')
  }

  update () {

  }

  updateAge () {
    this.petAge += 1

    this.growthStages.map(stage => {
      stage.age === this.petAge && this.add.image(400, 400, stage.key)
    })
  }
}
