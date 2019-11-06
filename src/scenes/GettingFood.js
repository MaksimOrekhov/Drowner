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
        var x = 100;
        var y = 200;
        FOOD_TYPES.map((item, i) => {
            x += i + 30;
            y += i + 20;
            console.log(x)
            if (i % 2 === 0) {
                x = 100;
            }
            this[item] = this.add.image(x, y, `food_${i}`);
            this[item].setScale(2, 2);
        });
    }

    update() {}
}
