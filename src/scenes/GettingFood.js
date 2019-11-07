import Phaser from 'phaser';
import { FOOD_TYPES } from './constants';

export default class GettingFood extends Phaser.Scene {
    constructor() {
        super('GettingFood');
    }

    init() {}

    preload() {
        this.load.image('food-tiles', 'assets/images/food/Food.png');
    }

    create() {
        this.add.text(this.cameras.main.centerX - 60, 100, 'Экран кормёжки');

        /**
         * создание карты изображений, от 0 до кол-ва картинок -1 пустое поле
         */
        let level = [[0, -1, 1, -1, 2], [-1, -1, -1, -1], [3, -1, 4, -1, 5]];
        var map = this.make.tilemap({
            data: level,
            tileWidth: 16,
            tileHeight: 16,
        });
        var tileset = map.addTilesetImage('food-tiles');
        var layer = map
            .createStaticLayer(
                0,
                tileset,
                this.cameras.main.centerX - 160,
                this.cameras.main.centerY - 25
            )
            .setScale(4, 4);
    }

    update() {}
}
