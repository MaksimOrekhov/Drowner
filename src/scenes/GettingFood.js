import Phaser from 'phaser';

export default class GettingFood extends Phaser.Scene {
    constructor() {
        super('GettingFood');
    }

    init() {}

    preload() {
        const food = this.load.image(
            'food-tiles',
            'assets/images/food/Food.png'
        );
    }

    create() {
        const title = this.add.text(
            this.cameras.main.centerX - 60,
            100,
            'Экран кормёжки'
        );
        const homeBtn = this.add.text(20, 20, 'Назад');
        homeBtn.setInteractive();
        homeBtn.on('pointerdown', () => {
            this.scene.start('Game');
        });

        /**
         * создание карты изображений, от 0 до кол-ва картинок -1 пустое поле
         */
        const foodMap = [
            [0, -1, 1, -1, 2],
            [-1, -1, -1, -1],
            [3, -1, 4, -1, 5],
        ];
        const map = this.make.tilemap({
            data: foodMap,
            tileWidth: 16,
            tileHeight: 16,
        });
        const tileset = map.addTilesetImage('food-tiles');
        const layer = map
            .createStaticLayer(
                0,
                tileset,
                this.cameras.main.centerX - 160,
                this.cameras.main.centerY - 25
            )
            .setScale(4, 4);
    }

    epta() {
        console.log('xuepta');
    }

    update() {}
}
