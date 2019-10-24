import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor (scene, game) {
    super('GameState');
    this.timeCounter = 0;
    this.fullness = 100;
    this.timeCoeff = 24;
  }

  init () {

  }

  preload () {

  }

  create () {
    this.time.addEvent({
      delay: 100 * this.timeCoeff,
      callback: this.fullnessReduction,
      callbackScope: this,
      loop: true
    });
  }

  updateCounter () {
    this.timeCounter += 1;
  }

  fullnessReduction (time) {
    if (this.fullness === 0) {
      this.dieMessage()
    }
    this.fullness -= 1;
    console.log(this.fullness)
  }

  dieMessage () {
    console.log('Я умер :(')
  }

  update () {
    console.log(this.fullness)
  }
}
