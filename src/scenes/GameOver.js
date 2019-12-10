import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init() {}

    preload() {}

    create() {
        // todo: показывать причину по которой он умер
        this.add.text(100, 100, 'ИГРА ОКОНЧЕНА. Ваш питомец умер.', {
            font: '40px Bangers',
            fill: '#7744ff',
        });
    }

    update() {}
}
