import Phaser from 'phaser';

export default class StartScreen extends Phaser.Scene {
    constructor() {
        super('StartScreen');

        this.gameStart = null;
        this.options = null;
    }

    init() {}

    preload() {
        this.load.image('start', './assets/images/start_screen.jpg');
    }

    create() {
        this.add.image(100, 400, 'start');

        this.gameStart = this.add.text(100, 100, 'Начать игру', {
            font: '40px Bangers',
            fill: '#fff',
        });

        this.options = this.add.text(100, 200, 'Настройки', {
            font: '40px Bangers',
            fill: '#fff',
        });

        this.gameStart.setInteractive();
        this.options.setInteractive();
        let petParameters = JSON.parse(localStorage.getItem('parameters'));

        this.gameStart.on('pointerdown', (pointer, localX, localY, event) => {
            petParameters.id !== null
                ? this.scene.start('Game')
                : this.scene.start('PetShop');
        });
    }

    update() {}
}
