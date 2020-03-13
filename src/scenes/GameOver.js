import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    constructor(data) {
        super('GameOver');
    }

    init(data) {
        this.add.text(this.cameras.main.centerX - 100 , this.cameras.main.centerY - 25 , 'ИГРА ОКОНЧЕНА');
        this.add.text(this.cameras.main.centerX - 100, this.cameras.main.centerY, `Ваш питомец умер!`);
    }
    // todo: добавить кнопку рестарта игры или чет такое
}
