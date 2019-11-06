import Phaser from 'phaser';

export default class GettingFood extends Phaser.Scene {
    constructor() {
        super('GettingFood');
    }

    init() {}

    preload() {}

    create() {
        this.add.text(100, 100, 'Экран кормежки', {
            font: '40px Bangers',
            fill: '#7744ff',
        });
    }

    update() {
        console.log('getting food');
    }
}
