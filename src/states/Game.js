import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.petAge = 0
  }
  preload () {
    this.load.image('mushroomSmall', './assets/images/mushroom2.png')
    this.load.image('mushroomBigger', './assets/images/icon-192px.png')
    this.load.image('mushroomBig', './assets/images/icon-512px.png')
  }

  create () {
    this.countGlobalTime()
    this.add.image(350, 150, 'mushroomSmall')
  }

  update () {
    console.log('---', this.petAge)
    if (this.petAge === 3) this.add.image(300, 100, 'mushroomBigger')
    if (this.petAge === 6) this.add.image(150, 50, 'mushroomBig')
  }

  countGlobalTime () {
    setInterval(() => {
      this.petAge += 1
    }, 2000)
  }
}
