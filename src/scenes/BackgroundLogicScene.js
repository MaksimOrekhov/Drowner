import Phaser from 'phaser';
import { TIMER_CONFIG } from './constants';
import LocalStorageSetter from '../modules/LocalStorageSetter';
import Growth from '../modules/Growth';
import Energy from '../modules/Energy';
import Sleep from '../modules/Sleep';
import Hunt from '../modules/Hunt';
import Fulness from '../modules/Fulness';

export default class BackgroundLogicScene extends Phaser.Scene {
    constructor() {
        super('BackgroundLogicScene');

        this.petsInCollection = [];
        this.localStorageSetter = null;
        this.petAge = 0;
        this.petSpriteName = null;
        this.petSpritePath = null;
        this.petID = null;
        this.fulness = 100;
        this.energy = 100;
        this.strength = 1;
        this.globalTimeValue = TIMER_CONFIG.globalTime; // 24 часа
        this.moneyAmount = 0;
        this.energyInstance = new Energy(this);
        this.sleepInstance = new Sleep(this);
        this.huntInstance = new Hunt(this);
        this.fulnessInstance = new Fulness(this);
        this.growthStages = {
            child: 0,
            teenager: 1,
            grownUp: 3,
            death: 5,
        };
        this.GameScene = null;
    }

    init() {
        this.getParametersFromLocalStorage();
        this.localStorageSetter = new LocalStorageSetter(this);
        !JSON.parse(localStorage.getItem('parameters')) &&
            this.localStorageSetter.setDataToStorage();
    }

    preload() {
        this.load.spritesheet('drowner', 'assets/images/bird.png', {
            frameWidth: 183,
            frameHeight: 175,
        });
        this.load.spritesheet('ghoul', 'assets/images/bird2.png', {
            frameWidth: 183,
            frameHeight: 175,
        });
        this.load.spritesheet('rotfiend', 'assets/images/bird3.png', {
            frameWidth: 183,
            frameHeight: 175,
        });
    }

    create() {
        this.GameScene = this.scene.get('Game');
        this.scene.launch('StartScreen');

        new Growth(this);

        this.anims.create({
            key: 'drowner',
            frames: this.anims.generateFrameNumbers('drowner', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'ghoul',
            frames: this.anims.generateFrameNumbers('ghoul', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'rotfiend',
            frames: this.anims.generateFrameNumbers('rotfiend', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'waterHag',
            frames: this.anims.generateFrameNumbers('drowner', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'fogler',
            frames: this.anims.generateFrameNumbers('ghoul', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });
    }

    update() {
        if (this.fulness <= 0) {
            this.showGameOver();
        }
    }

    getParametersFromLocalStorage() {
        let parameters = JSON.parse(localStorage.getItem('parameters'));
        if (parameters) {
            this.fulness = parameters.fulness;
            this.energy = parameters.energy;
            this.moneyAmount = parameters.moneyAmount;
            this.petAge = parameters.petAge;
            this.petID = parameters.id;
            this.petSpriteName = parameters.spriteName;
            this.petSpritePath = parameters.spritePath;
            this.petsInCollection = parameters.petsInCollection;
        }
    }

    showGameOver() {
        this.scene.remove('Game');
        this.scene.remove('StartScreen');
        this.scene.switch('GameOver');
    }

    setDataToStorage(data) {
        this.localStorageSetter.setDataToStorage(data);
    }
}
