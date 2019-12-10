import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init() {}

    preload() {}

    create() {
        // todo: показывать причину по которой он умер
        this.add.text(10, 10, 'ИГРА ОКОНЧЕНА. Ваш питомец умер.');
    }

    update() {}
}
