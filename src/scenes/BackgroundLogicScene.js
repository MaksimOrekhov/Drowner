import Phaser from 'phaser';

export default class BackgroundLogicScene extends Phaser.Scene {
    constructor() {
        super('BackgroundLogicScene');
    }

    init() {}

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
        this.scene.launch('StartScreen');

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

    update() {}
}
