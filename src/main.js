/* eslint-disable no-new */
import Phaser from 'phaser';
import config from './config';

class Game extends Phaser.Game {
    constructor() {
        const docElement = document.documentElement;
        const width =
            docElement.clientWidth > config.width
                ? config.width
                : docElement.clientWidth;
        const height =
            docElement.clientHeight > config.height
                ? config.height
                : docElement.clientHeight;
        super(width, height, Phaser.CANVAS, 'content', null);
        this.scene.start('StartScreen');
    }
}
