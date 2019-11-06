import Phaser from 'phaser';
import { FOOD_TYPES } from './constants';

export default class GettingFood extends Phaser.Scene {
    constructor() {
        super('GettingFood');
    }

    init() {}

    preload() {
        FOOD_TYPES.map((item, i) => {
            this.load.image(`food_${i}`, `assets/images/food/${item}.png`);
        });
    }

    create() {
        this.add.text(250, 50, 'Экран кормёжки');
        var x = 250;
        var y = 100;
        FOOD_TYPES.map((item, i) => {
            x += 100;
            if (i % 2 === 0) {
                x = 250;
                y += 100;
            }
            this[item] = this.add.image(x, y, `food_${i}`);
            this[item].setScale(3, 3);
        });
    }

    update() {}
}
