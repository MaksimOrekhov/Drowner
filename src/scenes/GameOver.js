import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init() {}

    preload() {}

    create() {
        this.add.text(100, 100, 'ИГРА ОКОНЧЕНА. Ваш питомец умер.', {
            font: '40px Bangers',
            fill: '#7744ff',
        });
    }

    update() {}
}
